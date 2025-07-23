import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';

export const createApp = async (
  options: FastifyServerOptions = {}
): Promise<FastifyInstance> => {
  const app = fastify({
    ...options,
  });

  app.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  });

  return app;
};
