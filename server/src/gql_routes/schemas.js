const { makeExecutableSchema } = require('graphql-tools');
const { readdirSync, readFileSync } = require('fs');
const path = require('path');
const _ = require('lodash');

const log = require('../lib/log');

const GRAPHQL_SCHEMA_PATH = path.resolve(__dirname, '../../schemas/graphql_schema/');
const EXTENDS_DIRECTORY_NAME = 'extends';

function loadSchemas() {
  const files = [];
  let schemas = [];

  readdirSync(GRAPHQL_SCHEMA_PATH).forEach((file) => {
    files.push(file);
  });

  _.pull(files, EXTENDS_DIRECTORY_NAME);

  log.info('[gql_routes/schemas/loadSchemas]', files);

  if (files.length === 0) {
    return [];
  }

  schemas = files.map(file => makeExecutableSchema({
    typeDefs: readFileSync(path.resolve(GRAPHQL_SCHEMA_PATH, file), 'utf8'),
  }));

  return schemas;
}

function loadExtendsTypeDefs() {
  const extendsFiles = [];
  let extendsTypeDefs = [];

  readdirSync(path.resolve(GRAPHQL_SCHEMA_PATH, EXTENDS_DIRECTORY_NAME)).forEach((file) => {
    extendsFiles.push(file);
  });

  log.info('[gql_routes/schemas/loadExtendsTypeDefs]', extendsFiles);

  if (extendsFiles.length > 0) {
    extendsTypeDefs = extendsFiles.map(file => readFileSync(path.resolve(GRAPHQL_SCHEMA_PATH, EXTENDS_DIRECTORY_NAME, file), 'utf8')).join('\n');
  }

  return extendsTypeDefs;
}

function init() {
  log.info('[gql_routes/schemas] init');

  const schemas = loadSchemas();
  const extendsTypeDefs = loadExtendsTypeDefs();

  return schemas.concat(extendsTypeDefs);
}

const schemas = init();

module.exports = schemas;
