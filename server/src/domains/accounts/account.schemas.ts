import { Type } from '@sinclair/typebox';

export const AccountSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String({ minLength: 2, maxLength: 50 }),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
});

//#region Request Schemas
export const CreateAccountSchema = Type.Object({
  name: Type.String({ minLength: 2, maxLength: 50 }),
});

export const UpdateAccountSchema = Type.Object({
  name: Type.String({ minLength: 2, maxLength: 50 }),
});

export const AccountQuerySchema = Type.Object({
  page: Type.Optional(Type.Number({ minimum: 1 })),
  limit: Type.Optional(Type.Number({ minimum: 1, maximum: 100 })),
});
//#endregion

//#region Response Schemas
export const AccountResponseSchema = AccountSchema;
export const AccountListResponseSchema = Type.Object({
  accounts: Type.Array(AccountSchema),
  pagination: Type.Object({
    page: Type.Number(),
    limit: Type.Number(),
    total: Type.Number(),
    totalPages: Type.Number(),
  }),
});
//#endregion

export const ErrorSchema = Type.Object({
  error: Type.String(),
  message: Type.String(),
  statusCode: Type.Number(),
});
