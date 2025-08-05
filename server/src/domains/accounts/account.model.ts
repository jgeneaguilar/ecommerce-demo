import { DataTypes, Model, CreationOptional } from 'sequelize';
import { sequelizeConnection } from '../../shared/database';

export class Account extends Model {
  declare id: string;
  declare name: string;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

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
