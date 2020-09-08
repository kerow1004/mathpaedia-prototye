const { mergeSchemas } = require('graphql-tools');
const schemas = require('./schemas');
const resolvers = require('./resolvers/index');
const dataloaders = require('./dataloaders');

function loadSchemas() {
  return mergeSchemas({ schemas, resolvers });
}

module.exports = {
  loadSchemas,
  dataloaders,
};
