/* eslint no-underscore-dangle: off */

const _ = require('lodash');
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const { db } = require('../db/index');
const log = require('../lib/log');

const DB_MODEL = 'user';
const JWT_SECRET = 'math_jwt_secret_01'; // Should not be hardcoded - use env
const JWT_OPTIONS = { expiresIn: 24 * 60 * 60 }; // in seconds

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

passport.serializeUser((user, done) => {
  log.info('[Auth] serializeUser:', typeof user, user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db(DB_MODEL).read(id);
    log.info('[Auth] deserializeUser', id, user);
    done(null, user);
  } catch (e) {
    log.error('[Auth] deserializeUser', id, e);
    done(e);
  }
});

const localSOptions = {};

passport.use(new LocalStrategy(localSOptions, async (username, password, done) => {
  let user;

  try {
    user = await db(DB_MODEL).read({ username });
    user = _.first(user);
    log.info('[Auth/LocalStrategy] username, user:', username, user);
  } catch (e) {
    log.error('[Auth/LocalStrategy] username, err:', username, e);
    done(e);
  }

  if (!user) {
    return done(null, false);
  }

  if (comparePass(password, user.password)) {
    done(null, user);
  } else {
    done(null, false);
  }
}));

const jwtSOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(new JWTStrategy(jwtSOptions, (jwtPayload, done) => {
  log.info('[Auth/JWTStrategy] jwtPayload', jwtPayload);

  // TODO: make userAuth with additional user data to auth
  const userAuth = jwtPayload;

  return done(null, userAuth);
}));

function jwtSign(data) {
  return jwt.sign(data, JWT_SECRET, JWT_OPTIONS);
}

function jwtVerify(token) {
  return jwt.verify(token, JWT_SECRET);
}

function jwtDecode(token) {
  return jwt.decode(token);
}

function authJWTMD(options = { session: true }) {
  return passport.authenticate('jwt', options);
}

// TODO: move login and logout codes from routes/auth

function register(data) {
  return new Promise(async (resolve, reject) => {
    const { username, password } = data;
    let registered;

    try {
      registered = await db(DB_MODEL).read({ username });

      if (registered.length > 0) {
        log.warn('[Auth/register] existing username', username);

        resolve({
          message: 'existing username',
        });

        return;
      }

      log.info('[Auth/register] username', username);
    } catch (e) {
      log.error('[Auth/register] username, error', username, e);
      reject(e);
      return;
    }

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    const body = _.merge(data, { password: hash });

    try {
      const result = await db(DB_MODEL).create(body);

      resolve({
        id: result._id,
        username: result.username,
        message: 'registered',
      });
    } catch (err) {
      reject(err);
    }
  });
}

function initPassport() {
  return passport.initialize();
}

// TODOs
// 1. logout - invalidate the token
// 2. revoke - all tokens belonging to a single user
// 3. revoke - an individual token
// 4. refresh - refresh token without user login again

module.exports = {
  lib: passport,
  initPassport,
  register,
  jwtMD: authJWTMD,
  jwt,
  jwtSign,
  jwtVerify,
  jwtDecode,
};
