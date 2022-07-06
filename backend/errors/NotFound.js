const { codeStatus } = require('../utils/constants');

const { NOT_FOUND } = codeStatus;

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
    this.statusCode = NOT_FOUND;
  }
}

module.exports = NotFound;
