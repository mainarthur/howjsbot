const TelegramBot = require('node-telegram-bot-api');

/**
 * @typedef {(args?: string, message?: TelegramBot.Message) => Promise<[string, TelegramBot.SendMessageOptions], [string]>} CommandHandler
 */

/**
 * @type {CommandHandler}
 */
const start = async () => {
  return [
    `Hello!
      
To use this bot, simply type "@HowJSBot " into your text box and click one of the results or click the button attached to this message.`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Share your jsness',
              switch_inline_query: '',
            },
          ],
        ],
      },
    },
  ];
};

/**
 * @type {CommandHandler}
 */
const reply = async (args, msg) => {
  const { message_id } = msg.reply_to_message ? msg.reply_to_message : msg;
  return [
    'Reply!',
    {
      reply_to_message_id: message_id,
    },
  ];
};

module.exports = {
  start,
  reply,
};
