const Koa = require('koa');
const koaLogger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const pino = require('koa-pino-logger')();

const auth = require('./services/auth');
const log = require('./lib/log');
const routerREST = require('./router');
const { initGQL, schemaGQL } = require('./graphql');

const app = new Koa();

// Log each request to the console
app.use(cors());
app.use(koaLogger());
app.use(pino);

// Log percolated errors to the console
app.on('error', (err) => {
  log.info('Server Error', err);
});

app
  .use(bodyParser())
  .use(auth.initPassport())
  .use(routerREST.routes())
  .use(routerREST.allowedMethods());

// TODO: initialize graphql server(apollo server) with elegant way
initGQL(app);

module.exports = {
  app,
  schemaGQL,
};
