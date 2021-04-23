const Bull = require('bull');

const { BOT_NAME } = require('../../config.json');

const botQueue = new Bull(BOT_NAME, {
  defaultJobOptions: {
    removeOnComplete: true,
    attempts: 2,
  },
  limiter: {
    duration: 1000,
    max: 30,
  },
});

module.exports = botQueue;
