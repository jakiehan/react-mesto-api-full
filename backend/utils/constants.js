module.exports.codeStatus = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,
};

module.exports.devConfig = {
  MONGODB_URL_DEV: 'mongodb://localhost:27017/mestodbdev',
  JWT_SECRET_DEV: 'dev-secret-mesto',
};
