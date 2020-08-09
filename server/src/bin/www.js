import express from 'express';
import cors from 'cors';
import configureApp from '../app';

import {
  port
} from '../config.js';

(async () => {
  const app = express();

  app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTION'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200,
  }));

  configureApp(app);

  app.listen(
    { port },
    () => console.log(`🚀 Server ready at http://localhost:${port}`),
  );
})();
