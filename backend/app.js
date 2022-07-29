const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const routes = require('./routes/index');
require('dotenv').config({ path: '/home/jakiehan/.env' });

const { handleError } = require('./middlewares/errors');
const limiter = require('./middlewares/rateLimit');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, NODE_ENV, MONGODB_URL_MESTO } = process.env;

const { devConfig } = require('./utils/constants');

const { MONGODB_URL_DEV } = devConfig;

const app = express();

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(cors);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

mongoose.connect(NODE_ENV === 'production' ? MONGODB_URL_MESTO : MONGODB_URL_DEV);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
