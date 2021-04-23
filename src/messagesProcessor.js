const TelegramBot = require('node-telegram-bot-api');
const Bull = require('bull');
const Timedelta = require('./utils/Timedelta');

const bot = require('./bot/bot');

/** @type {{[key: string]: import('./commands').CommandHandler }}*/
const routes = require('./commands');
const commandParser = require('./utils/commandParser');

/**
 *
 * @param {Bull.Job<TelegramBot.Message>} job
 * @returns
 */
const messagesProcessor = async (job) => {
  const {
    data: {
      text,
      from: { id: userId },
      chat: { id: chatId },
      date,
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

    await new Promise((res) => setTimeout(res, 5000));

    const { date: responseDate } = await bot.sendMessage(chatId, ...result);
    console.log(
      `[${new Date().toLocaleString()}]${
        userId === chatId ? `[#id${userId}]` : `[#id${userId}][#cid${chatId}]`
      } ${command} ${new Timedelta(date, responseDate)}`
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = messagesProcessor;
