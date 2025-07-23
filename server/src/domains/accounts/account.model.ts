import { DataTypes, Model } from 'sequelize';
import { SequelizeConnection } from '../../shared/database';

export class Account extends Model {
  declare id: string;
  declare name: string;
}

const sequelizeConnection = SequelizeConnection.getInstance();

Account.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50],
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: 'Account',
    tableName: 'accounts',
    timestamps: true,
  }
);
