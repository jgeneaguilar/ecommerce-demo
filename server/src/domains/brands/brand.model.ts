import { CreationOptional, DataTypes, Model } from 'sequelize';
import { sequelizeConnection } from '../../shared/database';

export class Brand extends Model {
  declare id: string;
  declare name: string;
  declare description: string;
  declare logo_url: string;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

Brand.init(
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
    description: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: {
        notEmpty: true,
        len: [2, 500],
      },
    },
    logo_url: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isUrl: true,
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
    modelName: 'Brand',
    tableName: 'brands',
    timestamps: true,
  }
);
