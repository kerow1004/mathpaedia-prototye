/* eslint no-underscore-dangle: off */
/* eslint no-param-reassign: off */

const fs = require('fs');
const path = require('path');
const async = require('async');
const _ = require('lodash');

const mongoose = require('mongoose');
const { autoIncrement } = require('mongoose-plugin-autoinc');
const mongoosastic = require('mongoosastic');

const { mdbClient } = require('./mdb_connection');
const { esClient } = require('./es_connection');
const log = require('../lib/log');

const MONGOOSE_SCHEMA_PATH = path.resolve(__dirname, '../../schemas/mongoose_schema/');
const SYNC_MDB_TO_ES = false;

const models = {};

const SCHEMA_OPTIONS = {
  timestamps: true,
  read: 'secondaryPreferred',
};

const ES_SYNC_OPTIONS = {
  createdAt: { type: Date, es_type: 'date', es_indexed: true },
  updatedAt: { type: Date, es_type: 'date', es_indexed: true },
};

function db(model) {
  return {
    create(items) {
      return new Promise((resolve, reject) => {
        if (_.isPlainObject(items)) {
          const doc = models[model](items);

          doc.save((err, result) => {
            log.info('[DB] Create one document', items, err, result);

            return err ? reject(err) : resolve(result);
          });
        } else if (Array.isArray(items)) {
          models[model].insertMany(items, (err, result) => {
            log.info('[DB] Create many documents', items, err, result);

            return err ? reject(err) : resolve(result);
          });
        } else {
          return reject(new Error('request item is not valid'));
        }
      });
    },
    // TODO
    //    - separate read as readItem and readCollection,
    //    - readCollection should provide options such as limit, offset, sortBy, sortByDesc, etc.
    read(id) {
      const opt = typeof id === 'object' ? id : { _id: id };

      return new Promise((resolve, reject) => {
        models[model].find(opt, (err, result) => {
          log.info('[DB] Read', id, err,Array.isArray(result) ? result.length : 1);

          if (opt._id !== undefined || opt.id !== undefined) {
            result = _.first(result);
          }

          return err ? reject(err) : resolve(result);
        });
      });
    },
    update(id, updateItem) {
      return new Promise((resolve, reject) => {
        delete updateItem.ctime;
        updateItem.mtime = Date.now();

        models[model].findByIdAndUpdate(id, { $set: updateItem }, { new: true }, (err, result) => {
          log.info('[DB] Update', id, updateItem, err, result);

          return err ? reject(err) : resolve(result);
        });
      });
    },
    delete(id) {
      return new Promise((resolve, reject) => {
        models[model].findByIdAndRemove(id, (err, result) => {
          log.info('[DB] Delete', id, err, result);

          return err ? reject(err) : resolve(result);
        });
      });
    },
    search(query) {
      return new Promise((resolve, reject) => {
        models[model].search(query, { hydrate: true }, (err, result) => {
          log.info('[DB] Search', query, err, result);

          return err ? reject(err) : resolve(result);
        });
      });
    },
    esSearch(body) {
      return new Promise((resolve, reject) => {
        models[model].esSearch(body, { hydrate: true }, (err, result) => {
          log.info('[DB] ES Search', body, err, result);

          return err ? reject(err) : resolve(result);
        });
      });
    },
  };
}

function initDB(cb) {
  log.info('[DB Init] Initializing');
  log.info('[DB Init] MONGOOSE_SCHEMA_PATH', MONGOOSE_SCHEMA_PATH);

  async.waterfall([
    (done) => {
      const schemaFiles = [];
      let error;

      try {
        fs.readdirSync(MONGOOSE_SCHEMA_PATH).forEach((file) => {
          schemaFiles.push(file);
          log.info('[MONGOOSE SCHEMA]', file);
        });
      } catch (e) {
        log.error('[DB Init] Error on reading schema files', e);
        error = e;
      }

      done(error, schemaFiles);
    },
    (schemaFiles, done) => {
      const schemaData = [];
      let error;

      _.forEach(schemaFiles, (file) => {
        const schemaFilePath = path.resolve(MONGOOSE_SCHEMA_PATH, file);
        const filename = _.first(_.split(file, '.'));

        try {
          const schema = JSON.parse(fs.readFileSync(schemaFilePath, 'utf8'));
          log.info('[DB Init] loading schema file', file, schemaFilePath);

          _.merge(schema, ES_SYNC_OPTIONS);

          schemaData.push({
            model: filename,
            info: schema,
          });
        } catch (e) {
          error = e;
        }
      });

      log.info('[DB Init]', schemaData);

      done(error, schemaData);
    },
    (schemaData, done) => {
      function _hasKey(obj, targetKey, targetValue) {
        const values = _.values(obj);
        let found = false;

        _.forEach(values, (value) => {
          if (_.isPlainObject(value)) {
            found = _hasKey(value, targetKey, targetValue);
          } else {
            found = _.has(obj, targetKey) && value === targetValue;
          }

          return !found;
        });

        return found;
      }

      async.eachSeries(schemaData, (schema, schemaDone) => {
        const Schema = new mongoose.Schema(schema.info, SCHEMA_OPTIONS);
        const modelName = _.upperFirst(schema.model);

        if (_hasKey(schema.info, 'es_indexed', true)) {
          Schema.plugin(mongoosastic, { esClient });
        }

        Schema.plugin(autoIncrement, { model: modelName, startAt: 1 });
        models[schema.model] = mongoose.model(modelName, Schema);
        log.info('[Schema Data]', schema.model, models[schema.model]);

        if (SYNC_MDB_TO_ES && _hasKey(schema.info, 'es_indexed', true)) {
          const syncStream = models[schema.model].synchronize();
          let syncCount = 0;

          syncStream.on('data', () => {
            syncCount += 1;
          });

          syncStream.on('close', () => {
            log.info('[MDB2ES/Sync]', `Model ${schema.model} : Indexed ${syncCount} documents!`);
          });

          syncStream.on('error', (err) => {
            log.error('[MDB2ES/Sync] Error', err);
          });
        }

        schemaDone();
      }, (err) => {
        log.info('[DB Init] Schema Models', models);

        done(err);
      });
    },
  ], (err) => {
    log.info('[DB Init] Done', err);
    return cb && cb(err);
  });
}

function init() {
  return new Promise((resolve, reject) => {
    initDB((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = {
  init,
  mdbClient,
  esClient,
  db,
};
