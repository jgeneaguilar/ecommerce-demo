import { CreationOptional, DataTypes, Model } from 'sequelize';
import { sequelizeConnection } from '../../shared/database';

export class Category extends Model {
  declare id: string;
  declare name: string;
  declare description: string;
  declare parent_category_id: string;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

Category.init(
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
    parent_category_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id',
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
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true,
  }
);
