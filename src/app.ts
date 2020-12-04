import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import config from 'config';
import routes from 'api';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(config.api.prefix, routes());

app.listen(config.port, (e?: string) => {
  if (e) {
    throw new Error(e);
  }

  console.info(`Application is running on port ${ config.port }`);
});
