import { Static } from '@sinclair/typebox';
import {
  BrandSchema,
  CreateBrandSchema,
  UpdateBrandSchema,
  BrandParamsSchema,
  BrandListQuerySchema,
  BrandResponseSchema,
  BrandListResponseSchema,
} from '../schemas/brand.schemas';

export type Brand = Static<typeof BrandSchema>;
export type CreateBrand = Static<typeof CreateBrandSchema>;
export type UpdateBrand = Static<typeof UpdateBrandSchema>;
export type BrandParams = Static<typeof BrandParamsSchema>;
export type BrandListQuery = Static<typeof BrandListQuerySchema>;
export type BrandResponse = Static<typeof BrandResponseSchema>;
export type BrandListResponse = Static<typeof BrandListResponseSchema>;