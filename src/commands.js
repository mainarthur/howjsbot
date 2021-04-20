/**
 * @returns {Promise<[string, import('node-telegram-bot-api').SendMessageOptions]>}
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

module.exports = {
  '/start': start,
};
