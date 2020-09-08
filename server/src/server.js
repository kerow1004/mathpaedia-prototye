const { createServer } = require('http');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const { app, schemaGQL } = require('./app');
const db = require('./db/index');
const log = require('./lib/log');

async function start() {
  await db.init();

  const port = process.env.PORT || 4060;

  const server = createServer(app.callback());
  server.listen(port);

  SubscriptionServer.create(
    { schema: schemaGQL, execute, subscribe },
    { path: '/subscriptions', server },
  );

  log.info('[server] server is starting', port);
}

start();
