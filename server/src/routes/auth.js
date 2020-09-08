/* eslint no-underscore-dangle: off */

const _ = require('lodash');
const passport = require('koa-passport');

const auth = require('../services/auth');
const log = require('../lib/log');

function login() {
  return async (ctx) => {
    return passport.authenticate('local', { session: false }, async (err, user, info, status) => {
      log.info('[Auth/login] err, user, info, status:', err, user, info, status);

      if (err || !user) {
        ctx.status = 401;
        ctx.body = {
          message: 'authentication is failed',
          user,
        };
        return;
      }

      try {
        await ctx.login(user, { session: false });
      } catch (loginErr) {
        log.info('[Auth/login] passport login', loginErr);

        if (err) {
          ctx.stauts = 500;
          ctx.body = {
            message: 'error with login process',
            user,
            err: loginErr,
          };
          return;
        }
      }

      const userInfo = { id: user._id, username: user.username };
      let token;

      try {
        token = auth.jwtSign(userInfo);
      } catch (tokenErr) {
        log.error('[Auth/login] jwt error', tokenErr);

        ctx.stauts = 500;
        ctx.body = {
          message: 'error with jwt',
          user,
          err: tokenErr,
        };

        return;
      }

      log.info('[Auth/login] jwt verify', auth.jwtVerify(token));
      log.info('[Auth/login] jwt decode', auth.jwtDecode(token));

      ctx.body = {
        ...userInfo,
        token,
      };
    })(ctx);
  };
}

// TODO: use token to check authenticated status and remove token for logout
function logout() {
  return async (ctx) => {
    const { username } = ctx.request.body;

    log.info('[Auth/logout] username', username);

    ctx.logout();

    ctx.status = 200;
  };
}

function register() {
  return async (ctx) => {
    try {
      const result = await auth.register(ctx.request.body);

      if (result.message === 'existing username') {
        ctx.status = 400;
        ctx.body = {
          message: 'existing username',
        };
        return;
      }

      if (result.message === 'registered') {
        ctx.body = {
          id: result.id,
          username: result.username,
        };
      }
    } catch (e) {
      log.error('[Auth/register] username, error', e);
      ctx.status = 500;
    }
  };
}

// TODOs
// 1. logout - invalidate the token
// 2. revoke - all tokens belonging to a single user
// 3. revoke - an individual token
// 4. refresh - refresh token without user login again

module.exports = {
  login,
  logout,
  register,
};
