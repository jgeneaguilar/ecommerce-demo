import { Sequelize } from 'sequelize';
import databaseConfig from '../../config/database';
import config from '../../config/environment';

const env = config.NODE_ENV as keyof typeof databaseConfig;
const dbConfig = databaseConfig[env];

export const sequelizeConnection = new Sequelize(dbConfig);
