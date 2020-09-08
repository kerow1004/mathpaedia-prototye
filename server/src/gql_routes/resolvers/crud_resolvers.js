const log = require('../../lib/log');
const { db } = require('../../db');

const ResourcesCRUD = [
  {
    model: 'problem',
    collection: 'problems',
  },
  {
    model: 'user',
    collection: 'users',
  },
];

module.exports.Query = ResourcesCRUD.reduce((acc, resource) => {
  acc[resource.model] = async (_, { id }, context) => {
    log.info('[gql/resolvers/r/i] id, user', id, context.user);
    return db(resource.model).read(id);
  };
  acc[resource.collection] = async (_, __, context) => {
    log.info('[gql/resolvers/r/c] user', context.user);
    return db(resource.model).read({});
  };
  return acc;
}, {});

module.exports.Mutation = ResourcesCRUD.reduce((acc, resource) => {
  const capitalizedResource = resource.model.replace(/^\w/, c => c.toUpperCase());

  acc[`create${capitalizedResource}`] = async (_, { input }, context) => {
    log.info('[gql/resolvers/crud] Create', context.header && context.header['content-length']);
    return db(resource.model).create(input);
  };
  acc[`update${capitalizedResource}`] = async (_, { id, input }, context) => {
    log.info('[gql/resolvers/crud] Update id:', id, context.header && context.header['content-length']);
    return db(resource.model).update(id, input);
  };
  acc[`delete${capitalizedResource}`] = async (_, { id }) => db(resource.model).delete(id);

  return acc;
}, {});

module.exports.Subscription = {
  // Add here subscriptions
};
