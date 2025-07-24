import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import { databasePlugin } from './shared/database/database.plugin';
import { accountPlugin } from './domains/accounts/account.plugin';
import fastifyCors from '@fastify/cors';

export const createApp = async (
  options: FastifyServerOptions = {}
): Promise<FastifyInstance> => {
  const app = fastify({
    ...options,
  });

  await app.register(databasePlugin);
  await app.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });

  // Domain plugins
  await app.register(accountPlugin, { prefix: '/v1/accounts' });

  app.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  });

  return app;
};
