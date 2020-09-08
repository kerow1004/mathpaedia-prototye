#!/usr/bin/env node

const program = require('commander');
const GenerateSchema = require('generate-schema');
// const GenGQLSchemaFromMDBSchema = require('mongoose-schema-to-graphql');
const fs = require('fs');
const _ = require('lodash');

const JSON_OBJECT_PATH = './source/json_object/';
const MONGOOSE_SCHEMA_PATH = './source/mongoose_object/';
const ELASTIC_SCHEMA_PATH = './source/elastic_object/';
const AVAILABLE_SCHEMAS = ['json', 'mongoose'];

program
  .version('0.0.1')
  .description('Schema Generating - JSON Schema, Mongoose Schema');

program
  .command('new <schema> [name]')
  .alias('n')
  .description('generate new schema - json, mongoose')
  .action((schema, name = '__all__') => {
    const files = [];

    console.log('schema, name', schema, name);

    if (AVAILABLE_SCHEMAS.indexOf(schema) < 0) {
      console.log('Not available schema', schema, AVAILABLE_SCHEMAS);
      return;
    }

    if (name === '__all__') {
      fs.readdirSync(JSON_OBJECT_PATH).forEach((file) => {
        files.push(file);
      });
    } else {
      try {
        const existJson = fs.statSync([JSON_OBJECT_PATH, `${name}.json`].join('/'));
        if (existJson) {
          files.push(`${name}.json`);
        }
      } catch (e) {
        console.error('file is not existing', name);
        return;
      }
    }

    console.log('JSON Object Files', files);

    if (files.length === 0) {
      return;
    }

    files.forEach((file) => {
      const filename = file.split('.')[0];
      let original;
      let source;

      try {
        original = JSON.parse(fs.readFileSync([JSON_OBJECT_PATH, file].join('/'), 'utf8'));
        source = original;
      } catch (e) {
        console.error('error on reading json object file', e);
        return;
      }

      if (schema === 'mongoose' && Array.isArray(original)) {
        source = _.reduce(source, (merged, obj) => _.merge(merged, obj));
      }

      const result = GenerateSchema[schema](source);

      if (schema === 'mongoose') {
        try {
          const mongooseSchema = JSON.parse(fs.readFileSync([MONGOOSE_SCHEMA_PATH, file].join('/'), 'utf8'));

          if (mongooseSchema) {
            console.log('[mongoose_object schema] merging schema', filename);
            _.merge(result, mongooseSchema);
          }

          const elasticSchema = JSON.parse(fs.readFileSync([ELASTIC_SCHEMA_PATH, file].join('/'), 'utf8'));

          if (elasticSchema) {
            console.log('[elastic_object schema] merging schema', filename);
            _.merge(result, elasticSchema);
          }
        } catch (e) {
          console.log('[elastic_object schema] no schema file', filename);
        }
      }

      fs.writeFileSync([`${schema}_schema`, `${filename}.schema.${schema}`].join('/'), JSON.stringify(result, null, 2));

      console.log(`[${schema} schema]`, filename);

    });
  });

program.parse(process.argv);