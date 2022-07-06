const { codeStatus } = require('../utils/constants');

const { CONFLICT } = codeStatus;

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.name = 'Conflict';
    this.statusCode = CONFLICT;
  }
}

module.exports = Conflict;
