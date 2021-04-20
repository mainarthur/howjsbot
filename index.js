const bot = require('./src/bot');
const botQueue = require('./src/queue');

const inlineQueryProcessor = require('./src/inlineQueryProcessor');
const messagesProcessor = require('./src/messagesProcessor');
const messagesRateLimiter = require('./src/messagesRateLimiter');

bot.on('message', messagesRateLimiter);

bot.on('inline_query', inlineQueryProcessor);
botQueue.process('message', messagesProcessor);

(async () => {
  await bot.startPolling();
  console.log('Bot is started');
})();
