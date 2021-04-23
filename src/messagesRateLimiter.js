const botQueue = require('./bot/queue');

const rateLimiter = {};

/**
 * @param {import('node-telegram-bot-api').Message} msg
 */
const messagesRateLimiter = async (msg) => {
  const {
    chat: { id: chatId },
  } = msg;

  if (!rateLimiter[chatId]) rateLimiter[chatId] = {};

  const now = Math.floor(Date.now() / 1000);

  if (!rateLimiter[chatId][now]) rateLimiter[chatId] = { [now]: 0 };

  rateLimiter[chatId][now]++;

  if (rateLimiter[chatId][now] > 2) return;

  botQueue.add('message', msg);
};

module.exports = messagesRateLimiter;
