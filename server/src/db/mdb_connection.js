const mongoose = require('mongoose');
const log = require('../lib/log');

const username = 'mathadmin';
const password = 'mathadmin';
const db = 'math';
const port = 27017;
const host = process.env.MDB_HOST || 'localhost';

mongoose.connect(`mongodb://${username}:${password}@${host}/${db}?authSource=admin`);
mongoose.set('debug', true);

log.info('MDB Connection', host, port);

const mdbClient = mongoose.connection;

mdbClient.on('error', (err) => {
  log.error('MDB Error', err);
});

mdbClient.once('open', () => {
  log.info('Connected to MDB');
});

module.exports = {
  mdbClient,
};
