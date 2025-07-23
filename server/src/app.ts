import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import { databasePlugin } from './shared/database/database.plugin';

export const createApp = async (
  options: FastifyServerOptions = {}
): Promise<FastifyInstance> => {
  const app = fastify({
    ...options,
  });

  await app.register(databasePlugin);

  app.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  });

  return app;
};
