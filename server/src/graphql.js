const { ApolloServer } = require('apollo-server-koa');

const logger = require('./lib/log');
const auth = require('./services/auth');
const gql = require('./gql_routes');

const schema = gql.loadSchemas();

function initGQL(app) {
  if (!schema) {
    return;
  }

  const server = new ApolloServer({
    schema,
    context: ({ ctx }) => {
      const { header } = ctx.request;
      const { authorization } = header;
      const token = authorization && authorization.split(' ')[1];
      const user = token && auth.jwtVerify(token);

      logger.info('[graphql] user', user);

      return {
        header,
        user,
        loaders: gql.dataloaders(),
      };
    },
    playground: {
      settings: {
        'editor.cursorShape': 'block',
        'editor.theme': 'dark',
      },
    },
    tracing: true,
  });

  server.applyMiddleware({
    app,
    path: '/graphql',
  });
}

module.exports = {
  initGQL,
  schemaGQL: schema,
};
