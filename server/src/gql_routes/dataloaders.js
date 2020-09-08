const DataLoader = require('dataloader');
const { keyBy } = require('lodash');

const { db } = require('../db');
const logger = require('../lib/log');

async function batchItems(model, modelIds) {
  logger.info('[dataloaders] modelIds', modelIds);

  const items = await db('user').read({
    _id: {
      $in: modelIds,
    },
  });

  const itemByIds = keyBy(items, '_id');

  logger.info('[dataloaders] items by Id:', modelIds, itemByIds);

  return modelIds.map(modelId => itemByIds[modelId]);
}

const userLoader = () => new DataLoader(modelIds => batchItems('user', modelIds));

module.exports = function () {
  return {
    user: userLoader(),
  };
};
