const factory = require('pino-pretty');
const pino = require('pino');

// writable is any Writable stream
const writable = process.stdout;
const dest = factory({ colorize: true }).asMetaWrapper(writable);

const logger = pino({}, dest);

module.exports = logger;

