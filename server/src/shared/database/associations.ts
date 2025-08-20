import { Brand } from '../../domains/brands/brand.model';
import { Category } from '../../domains/categories/category.model';
import { Product } from '../../domains/products/product.model';

export const defineAssociations = (): void => {
  Product.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category',
  });

  Category.hasMany(Product, {
    foreignKey: 'category_id',
    as: 'products',
  });

  Category.belongsTo(Category, {
    foreignKey: 'parent_category_id',
    as: 'parentCategory',
  });

  Category.hasMany(Category, {
    foreignKey: 'parent_category_id',
    as: 'subcategories',
  });

  Product.belongsTo(Brand, {
    foreignKey: 'brand_id',
    as: 'brand',
  });

  Brand.hasMany(Product, {
    foreignKey: 'brand_id',
    as: 'products',
  });
};
