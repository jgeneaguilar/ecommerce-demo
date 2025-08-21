import { Static } from '@sinclair/typebox';
import {
  CategoryListQuerySchema,
  CategoryListResponseSchema,
  CategoryParamsSchema,
  CategoryResponseSchema,
  CategorySchema,
  CreateCategorySchema,
  UpdateCategorySchema,
} from '../schemas/category.schemas';

export type Category = Static<typeof CategorySchema>;
export type CreateCategory = Static<typeof CreateCategorySchema>;
export type UpdateCategory = Static<typeof UpdateCategorySchema>;
export type CategoryParams = Static<typeof CategoryParamsSchema>;
export type CategoryListQuest = Static<typeof CategoryListQuerySchema>;
export type CategoryResponse = Static<typeof CategoryResponseSchema>;
export type CategoryListResponse = Static<typeof CategoryListResponseSchema>;
