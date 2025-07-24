import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';
import config from './config/environment';

const start = async () => {
  try {
    const app = await createApp();

    const port = config.PORT;

    await app.listen({ port });
    console.info(`Server ready at port: ${port}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
