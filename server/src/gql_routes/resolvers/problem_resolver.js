const logger = require('../../lib/log');
// const { db } = require('../../db/index');

module.exports = {
  async user(problem, _, context) {
    // const user = await db('user').read(problem.userId);
    // log.info('[gql_routes/resolvers/problem]', problem, problem.userId, user);
    // return user;
    if (!problem.userId) {
      return null;
    }

    const user = await context.loaders.user.load(problem.userId);

    logger.info('[resolers/problem_resolver] problem, user', problem, user);

    return user;
  },
};
