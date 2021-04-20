const bot = require('./bot');
/** @type {{[key: string]: (message: import('node-telegram-bot-api').Message) => Promise<[string, import('node-telegram-bot-api').SendMessageOptions]>}}*/
const routes = require('./commands');

/**
 *
 * @param {import('bull').Job<import('node-telegram-bot-api').Message>} job
 * @returns
 */
const messagesProcessor = async (job) => {
  const {
    data: {
      text,
      from: { id: userId },
    },
    data: message,
  } = job;

  if (!routes[text]) return;

  const handler = routes[text];
  const result = await handler(Object.freeze({ ...message }));

  await bot.sendMessage(userId, ...result);
};

module.exports = messagesProcessor;
