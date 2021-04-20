const botQueue = require('./queue');

const rateLimiter = {};

/**
 * @param {import('node-telegram-bot-api').Message} msg
 */
const messagesRateLimiter = async (msg) => {
  const {
    from: { id: userId },
  } = msg;

  if (!rateLimiter[userId]) rateLimiter[userId] = {};

  const now = Math.floor(Date.now() / 1000);

  if (!rateLimiter[userId][now]) rateLimiter[userId] = { [now]: 0 };

  rateLimiter[userId][now]++;

  if (rateLimiter[userId][now] > 2) return;

  botQueue.add('message', msg);
};

module.exports = messagesRateLimiter;
