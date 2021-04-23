const Command = require('../Command');

/**
 *
 * @param {import('node-telegram-bot-api').Message} msg
 *
 * @returns {Command}
 */
const commandParser = (msg) => {
  const {
    text: messageText,
    caption,
    entities: textEntites,
    caption_entities,
  } = msg;

  const text = messageText ?? caption;
  const entities = textEntites ?? caption_entities;

  if (!text && !entities) {
    return null;
  }

  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];

    if (entity.offset === 0 && entity.type == 'bot_command') {
      return new Command(
        text.substring(1, entity.length),
        text.substring(entity.length + 1).trim()
      );
    }
  }

  return null;
};

module.exports = commandParser;
