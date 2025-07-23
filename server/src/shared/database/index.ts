import { Sequelize } from 'sequelize';
import { databaseConfig } from '../../config/database';
import { config } from '../../config/environment';

const env = config.NODE_ENV as keyof typeof databaseConfig;
const dbConfig = databaseConfig[env];

export const sequelize = new Sequelize(dbConfig);

class SequelizeConnection {
  private static instance: Sequelize;

  private constructor() {
    SequelizeConnection.instance = new Sequelize(dbConfig);
  }

  public static getInstance(): Sequelize {
    if (!SequelizeConnection.instance) {
      new SequelizeConnection();
    }

    return SequelizeConnection.instance;
  }
}

import { Account } from '../../domains/accounts/account.model';

export { SequelizeConnection, Account };
