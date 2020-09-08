const auth = require('../../services/auth');
const log = require('../../lib/log');

const register = async (_, { username, email, password }) => {
  try {
    const result = await auth.register({ username, email, password });
    let returnData;

    if (result.message === 'existing username') {
      returnData = {
        username,
        message: 'existing username',
      };
    }

    if (result.message === 'registered') {
      returnData = {
        id: result.id,
        username: result.username,
      };
    }

    return returnData;
  } catch (e) {
    log.error('[Auth/register] username, error', e);
    return e;
  }
};

module.exports.Query = {
  // Add here Query
};

module.exports.Mutation = {
  register,
};

module.exports.Subscription = {
  // Add here subscriptions
};
