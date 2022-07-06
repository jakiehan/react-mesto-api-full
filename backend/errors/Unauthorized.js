const { codeStatus } = require('../utils/constants');

const { UNAUTHORIZED } = codeStatus;

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = Unauthorized;
