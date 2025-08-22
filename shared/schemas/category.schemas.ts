import { Type } from '@sinclair/typebox';
import { PaginationSchema } from './common.schemas';

export const CategorySchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String({ minLength: 2, maxLength: 50 }),
  description: Type.Optional(Type.String({ minLength: 2, maxLength: 500 })),
  parent_category_id: Type.Optional(Type.String({ format: 'uuid' })),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
});

//#region Request Schemas
export const CreateCategorySchema = Type.Object({
  name: Type.String({ minLength: 2, maxLength: 50 }),
  description: Type.Optional(Type.String({ minLength: 2, maxLength: 500 })),
  parent_category_id: Type.Optional(Type.String({ format: 'uuid' })),
});

export const UpdateCategorySchema = Type.Partial(CreateCategorySchema);

export const CategoryParamsSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
});

export const CategoryListQuerySchema = Type.Object({
  page: Type.Optional(Type.Number({ minimum: 1 })),
  limit: Type.Optional(Type.Number({ minimum: 1, maximum: 100 })),
});
//#endregion

//#region Response Schemas
export const CategoryResponseSchema = CategorySchema;
export const CategoryListResponseSchema = Type.Object({
  categories: Type.Array(CategorySchema),
  pagination: PaginationSchema,
});
//#endregion
