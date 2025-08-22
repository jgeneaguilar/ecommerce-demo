import { Type } from '@sinclair/typebox';
import { PaginationSchema } from './common.schemas';

export const UserSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String({ minLength: 2, maxLength: 50 }),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
});

//#region Request Schemas
export const CreateUserSchema = Type.Object({
  name: Type.String({ minLength: 2, maxLength: 50 }),
});

export const UpdateUserSchema = Type.Object({
  name: Type.String({ minLength: 2, maxLength: 50 }),
});

export const UserParamsSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
});

export const UserListQuerySchema = Type.Object({
  page: Type.Optional(Type.Number({ minimum: 1 })),
  limit: Type.Optional(Type.Number({ minimum: 1, maximum: 100 })),
});
//#endregion

//#region Response Schemas
export const UserResponseSchema = UserSchema;
export const UserListResponseSchema = Type.Object({
  users: Type.Array(UserSchema),
  pagination: PaginationSchema,
});
//#endregion
