import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

import config from 'config';
import routes from 'api';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(config.api.prefix, routes());
app.use('/media', express.static(path.join(__dirname, '..', 'db', 'media')));

export default app;
