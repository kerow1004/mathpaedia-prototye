const CRUDResolvers = require('./crud_resolvers');
const authResolvers = require('./auth_resolvers');
const problemResolver = require('./problem_resolver');

module.exports = {
  Query: {
    ...CRUDResolvers.Query,
  },
  Mutation: {
    ...CRUDResolvers.Mutation,
    ...authResolvers.Mutation,
  },
  Subscription: {

  },
  Problem: problemResolver,
};
