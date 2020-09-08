const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

const salad = {
  avocado: 1, mango: 1, tomato: 0.2, arugula: true, onion: true,
};
const burger = {
  buns: 2, shrimp: 1, egg: 1, lettuce: 2.5, mayo: true,
};
const salads = new Array(100).fill(salad);
const burgers = new Array(100).fill(burger);
const get = (what, count) => what.splice(0, parseInt(count, 10) || 1);
const getStats = () => ({ salads: salads.length, burgers: burgers.length });

module.exports.Query = {
  salads: (_, { count }) => get(salads, count),
  burgers: (_, { count }) => get(burgers, count),
};

module.exports.Mutation = {
  addSalads: (_, { count }) => {
    salads.push(...new Array(count).fill(salad));
    pubsub.publish('foodAdded', { foodAdded: getStats() });
    return salads.length;
  },
  addBurgers: (_, { count }) => {
    burgers.push(...new Array(count).fill(burger));
    pubsub.publish('foodAdded', { foodAdded: getStats() });
    return burgers.length;
  },
};

module.exports.Subscription = {
  foodAdded: {
    subscribe: () => pubsub.asyncIterator('foodAdded'),
  },
};
