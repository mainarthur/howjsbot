const TelegramBot = require('node-telegram-bot-api');

const bot = require('./bot/bot');

/** @type {{[key: string]: import('./commands').CommandHandler }}*/
const routes = require('./commands');
const commandParser = require('./utils/commandParser');

/**
 *
 * @param {import('bull').Job<import('node-telegram-bot-api').Message>} job
 * @returns
 */
const messagesProcessor = async (job) => {
  const {
    data: {
      text,
      chat: { id: chatId },
    },
    data: message,
  } = job;

  try {
    const command = commandParser(message);

    if (!command || !routes[command.commandName]) return;

    const handler = routes[command.commandName];

    const result = await handler(
      command.arguments,
      Object.freeze({ ...message })
    );

    await bot.sendMessage(chatId, ...result);
  } catch (err) {
    console.log(err);
  }
};

module.exports = messagesProcessor;
