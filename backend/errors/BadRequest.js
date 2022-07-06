const { codeStatus } = require('../utils/constants');

const { BAD_REQUEST } = codeStatus;

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequest';
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = BadRequest;
