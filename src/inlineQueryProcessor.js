const bot = require('./bot/bot');
const generateId = require('./utils/generateId');
const generateRandomPercent = require('./utils/generateRandomPercent');

/**
 * @param {import('node-telegram-bot-api').InlineQuery} iq
 */
const inlineQueryProcessor = async (iq) => {
  const { query, id } = iq;
  await bot.answerInlineQuery(
    id,
    [
      {
        id: generateId(),
        type: 'article',
        title: `How js ${!query ? 'are you' : `is ${query}`}`,
        input_message_content: {
          message_text: `🏳️‍🌈 ${
            !query ? 'I am' : `${query} is`
          } ${generateRandomPercent()}% gay!`,
        },
      },
    ],
    {
      cache_time: 0,
      is_personal: true,
    }
  );
};

module.exports = inlineQueryProcessor;
