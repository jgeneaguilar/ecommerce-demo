import { FastifyInstance } from 'fastify';
import { SequelizeConnection } from './index';

const sequelizeConnection = SequelizeConnection.getInstance();

declare module 'fastify' {
  interface FastifyInstance {
    db: typeof sequelizeConnection;
  }
}

export const databasePlugin = async (fastify: FastifyInstance) => {
  try {
    await sequelizeConnection.authenticate();
    fastify.log.info('Database connection established successfully!');

    fastify.decorate('db', sequelizeConnection);

    if (process.env.NODE_ENV === 'development') {
      await sequelizeConnection.sync({ alter: true });
      fastify.log.info('Database synchronized');
    }

    fastify.addHook('onClose', async (_) => {
      await sequelizeConnection.close();
      fastify.log.info('Database connection closed');
    });
  } catch (error) {
    fastify.log.error('Unable to connect to database', error);
    throw error;
  }
};
