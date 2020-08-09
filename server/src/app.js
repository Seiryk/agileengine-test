
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';


import {
  transactionRouter,
} from './modules/routs';

import {
  syncErrorHandler,
  defaultRouter,
} from './modules/base/controllers';

export default (app) => {
  app.use(bodyParser.json());

  app.use('/', transactionRouter);

  app.use(express.static(path.resolve(__dirname) + "/build"));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname) + "/build/index.html");
  });

  app.use(defaultRouter);
  app.use(syncErrorHandler);
}