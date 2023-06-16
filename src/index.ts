import http from 'http';
import app from './app';
import { connectToDatabase } from './db';

import { PORT } from './config';
import { logErrorMessage } from './utils/loggers';

const server = http.createServer(app);

export const SRC_DIR = __dirname;

const start = async () => {
  try {
    await connectToDatabase();
    server.listen(PORT, () => console.log(`Server is running at ${PORT}`));
  } catch (error: unknown) {
    logErrorMessage(error);
    console.log(error);
  }
};

void start();
