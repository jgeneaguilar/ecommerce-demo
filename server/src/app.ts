import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import { databasePlugin } from './shared/database/database.plugin';
import { userPlugin } from './domains/users/user.plugin';
import fastifyCors from '@fastify/cors';

export const createApp = async (
  options: FastifyServerOptions = {}
): Promise<FastifyInstance> => {
  const app = fastify({
    ...options,
  });

  await app.register(databasePlugin);
  await app.register(fastifyCors, {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });

  // Domain plugins
  await app.register(userPlugin, { prefix: '/v1/users' });

  app.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  });

  return app;
};
