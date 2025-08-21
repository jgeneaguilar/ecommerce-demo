import { Type } from '@sinclair/typebox';

export const ProductSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String({ minLength: 2, maxLength: 50 }),
  description: Type.String({ minLength: 2, maxLength: 500 }),
  price: Type.Integer({ min: 0 }),
  category_id: Type.String({ format: 'uuid' }),
  stock: Type.Integer({ min: 0 }),
  brand_id: Type.String({ format: 'uuid' }),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
});

//#region Request Schemas
export const CreateProductSchema = Type.Object({
  name: Type.String({ minLength: 2, maxLength: 50 }),
  description: Type.String({ minLength: 2, maxLength: 500 }),
  price: Type.Integer({ min: 0 }),
  category_id: Type.String({ format: 'uuid' }),
  stock: Type.Integer({ min: 0 }),
  brand_id: Type.String({ format: 'uuid' }),
});

export const UpdateProductSchema = Type.Partial(CreateProductSchema);

export const ProductParamsSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
});

export const ProductListQuerySchema = Type.Object({
  page: Type.Optional(Type.Number({ minimum: 1 })),
  limit: Type.Optional(Type.Number({ minimum: 1, maximum: 100 })),
});
//#endregion

//#region Response Schemas
export const ProductResponseSchema = ProductSchema;
export const ProductListResponseSchema = Type.Object({
  products: Type.Array(ProductSchema),
  pagination: Type.Object({
    page: Type.Number(),
    limit: Type.Number(),
    total: Type.Number(),
    totalPages: Type.Number(),
  }),
});
//#endregion
