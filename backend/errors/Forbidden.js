const { codeStatus } = require('../utils/constants');

const { FORBIDDEN } = codeStatus;

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.name = 'Forbidden';
    this.statusCode = FORBIDDEN;
  }
}

module.exports = Forbidden;
