const TelegramBot = require('node-telegram-bot-api');

const { BOT_TOKEN } = require('../config.json');

const bot = new TelegramBot(BOT_TOKEN);

module.exports = bot;
