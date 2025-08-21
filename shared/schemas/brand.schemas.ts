import { Type } from '@sinclair/typebox';

export const BrandSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String({ minLength: 2, maxLength: 50 }),
  description: Type.String({ minLength: 2, maxLength: 500 }),
  logo_url: Type.String({ format: 'uri' }),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
});

//#region Request Schemas
export const CreateBrandSchema = Type.Object({
  name: Type.String({ minLength: 2, maxLength: 50 }),
  description: Type.String({ minLength: 2, maxLength: 500 }),
  logo_url: Type.String({ format: 'uri' }),
});

export const UpdateBrandSchema = Type.Partial(CreateBrandSchema);

export const BrandParamsSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
});

export const BrandListQuerySchema = Type.Object({
  page: Type.Optional(Type.Number({ minimum: 1 })),
  limit: Type.Optional(Type.Number({ minimum: 1, maximum: 100 })),
});
//#endregion

//#region Response Schemas
export const BrandResponseSchema = BrandSchema;
export const BrandListResponseSchema = Type.Object({
  brands: Type.Array(BrandSchema),
  pagination: Type.Object({
    page: Type.Number(),
    limit: Type.Number(),
    total: Type.Number(),
    totalPages: Type.Number(),
  }),
});
//#endregion