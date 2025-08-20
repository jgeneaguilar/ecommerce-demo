import { FastifyInstance } from 'fastify';
import { sequelizeConnection } from './index';
import { defineAssociations } from './associations';

declare module 'fastify' {
  interface FastifyInstance {
    db: typeof sequelizeConnection;
  }
}

export const databasePlugin = async (
  fastify: FastifyInstance
): Promise<void> => {
  try {
    await sequelizeConnection.authenticate();
    fastify.log.info('Database connection established successfully!');

    fastify.decorate('db', sequelizeConnection);

    defineAssociations();

    if (process.env.NODE_ENV === 'development') {
      await sequelizeConnection.sync({ alter: true });
      fastify.log.info('Database synchronized');
    }

    fastify.addHook('onClose', async () => {
      await sequelizeConnection.close();
      fastify.log.info('Database connection closed');
    });
  } catch (error) {
    fastify.log.error('Unable to connect to database', error);
    throw error;
  }
};
