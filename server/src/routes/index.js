const { db } = require('../db/index');

function getAll(model) {
  return async (ctx) => {
    ctx.log.info('Get collection', model);

    try {
      const result = await db(model).read({});
      ctx.body = result;
    } catch (err) {
      ctx.throw(400, 'error on getting collection', err);
    }
  };
}

function get(model) {
  return async (ctx) => {
    const id = Number(ctx.params.id);

    ctx.log.info('Get item', model, id);

    try {
      const result = await db(model).read(id);
      ctx.body = result;
    } catch (err) {
      ctx.throw(400, 'error on getting an item', err);
    }
  };
}

function post(model) {
  return async (ctx) => {
    const { body } = ctx.request;

    ctx.log.info('Post item', model, body);

    try {
      const result = await db(model).create(body);
      ctx.body = result;
    } catch (err) {
      ctx.throw(400, 'error on creating an item', err);
    }
  };
}

function put(model) {
  return async (ctx) => {
    const id = Number(ctx.params.id);
    const { body } = ctx.request;

    ctx.log.info('Put item', model, id, body);

    try {
      const result = await db(model).update(id, body);
      ctx.body = result;
    } catch (err) {
      ctx.throw(400, 'error on updating an item', err);
    }
  };
}

function remove(model) {
  return async (ctx) => {
    const id = Number(ctx.params.id);

    ctx.log.info('Delete item', model, id);

    try {
      const result = await db(model).delete(id);
      ctx.body = result;
    } catch (err) {
      ctx.throw(400, 'error on deleting an item', err);
    }
  };
}

module.exports = {
  getAll,
  get,
  post,
  put,
  delete: remove,
};
