const crypto = require('crypto');

const generateId = () => crypto.randomBytes(32).toString('hex');

module.exports = generateId;
