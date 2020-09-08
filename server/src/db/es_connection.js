const elasticsearch = require('elasticsearch');
const log = require('../lib/log');

const index = 'library';
const type = 'novel';
const port = 9200;
const host = process.env.ES_HOST || 'localhost';
const esClient = new elasticsearch.Client({ host: { host, port }});

log.info('ES Connection', host, port);

async function checkConnection() {
  let isConnected = false;

  while (!isConnected) {
    log.info('Connecting to ES');

    try {
      const health = await esClient.cluster.health({});
      log.info(health);
      isConnected = true;
    } catch (err) {
      log.info('Connection Failed, Retrying...', err);
    }
  }
}

async function resetIndex() {
  if (await esClient.indices.exists({ index })) {
    await esClient.indices.delete({ index });
  }

  await esClient.indices.create({ index });
  await putBookMapping();
}

async function putBookMapping() {
  const schema = {
    title: { type: 'keyword' },
    author: { type: 'keyword' },
    location: { type: 'integer' },
    text: { type: 'text' },
  };

  return esClient.indices.putMapping({
    index,
    type,
    body: {
      properties: schema,
    },
  });
}

module.exports = {
  esClient,
  index,
  type,
  checkConnection,
  resetIndex,
};
