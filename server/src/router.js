const joi = require('joi');
const _ = require('lodash');
const validate = require('koa-joi-validate');
const Router = require('koa-router');

const routes = require('./routes/index');
const authRoutes = require('./routes/auth')
const search = require('./routes/search');

const auth = require('./services/auth');

const router = new Router({
  prefix: '/api',
});

router.get('/ping', async (ctx) => {
  ctx.body = {
    code: 'success',
    message: 'pong',
  };
});

router.get('/problems', routes.getAll('problem'));
router.get('/problems/:id', routes.get('problem'));
router.post('/problems', routes.post('problem'));
router.put('/problems/:id', routes.put('problem'));
router.delete('/problems/:id', routes.delete('problem'));

router.get('/solutions', routes.getAll('solution'));
router.get('/solutions/:id', routes.get('solution'));
router.post('/solutions', routes.post('solution'));
router.put('/solutions/:id', routes.put('solution'));
router.delete('/solutions/:id', routes.delete('solution'));

router.get('/answers', routes.getAll('answer'));
router.get('/answers/:id', routes.get('answer'));
router.post('/answers', routes.post('answer'));
router.put('/answers/:id', routes.put('answer'));
router.delete('/answers/:id', routes.delete('answer'));

router.get('/users', routes.getAll('user'));
router.get('/users/:id', auth.jwtMD(), routes.get('user'));
router.post('/users', routes.post('user'));
router.put('/users/:id', routes.put('user'));
router.delete('/users/:id', routes.delete('user'));

router.post('/auth/login', authRoutes.login());
router.post('/auth/logout', authRoutes.logout());
router.post('/auth/register', authRoutes.register());

router.get(
  '/search',
  validate({
    query: {
      query: joi.string().max(60).required(),
      offset: joi.number().integer().min(0).default(0),
    },
  }),
  search.search,
);

// router.get(
//   '/paragraphs',
//   validate({
//     query: {
//       bookTitle: joi.string().max(256).required(),
//       start: joi.number().integer().min(0).default(0),
//       end: joi.number().integer().greater(joi.ref('start')).default(10),
//     },
//   }),
//   search.paragraphs,
// );

let stock = {};

router.get('/stock', async (ctx, next) => {
  ctx.body = stock;
});

router.put('/stock', async (ctx, next) => {
  ctx.log.info(ctx.body);
  stock = ctx.request.body;
  ctx.body = stock;
});

module.exports = router;
