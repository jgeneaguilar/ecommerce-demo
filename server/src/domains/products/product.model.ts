import { CreationOptional, DataTypes, Model } from 'sequelize';
import { sequelizeConnection } from '../../shared/database';

export class Product extends Model {
  declare id: string;
  declare name: string;
  declare description: string;
  declare price: number;
  declare category_id: string;
  declare stock: number;
  declare brand_id: string;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

Product.init(
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
    price: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      validate: {
        min: 0,
      },
      comment: 'Price in cents (e.g. 1245 = $12.45)',
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    stock: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    brand_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'brands',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
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
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
  }
);
