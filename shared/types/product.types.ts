import { Static } from '@sinclair/typebox';
import {
  CreateProductSchema,
  ProductListResponseSchema,
  ProductListQuerySchema,
  ProductResponseSchema,
  ProductSchema,
  UpdateProductSchema,
  ProductParamsSchema,
} from '../schemas/product.schemas';

export type Product = Static<typeof ProductSchema>;
export type CreateProduct = Static<typeof CreateProductSchema>;
export type UpdateProduct = Static<typeof UpdateProductSchema>;
export type ProductParams = Static<typeof ProductParamsSchema>;
export type ProductListQuery = Static<typeof ProductListQuerySchema>;
export type ProductResponse = Static<typeof ProductResponseSchema>;
export type ProductListResponse = Static<typeof ProductListResponseSchema>;
