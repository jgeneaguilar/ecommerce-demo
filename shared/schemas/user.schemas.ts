import { Type } from '@sinclair/typebox';

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

export const UserQuerySchema = Type.Object({
  page: Type.Optional(Type.Number({ minimum: 1 })),
  limit: Type.Optional(Type.Number({ minimum: 1, maximum: 100 })),
});
//#endregion

//#region Response Schemas
export const UserResponseSchema = UserSchema;
export const UserListResponseSchema = Type.Object({
  users: Type.Array(UserSchema),
  pagination: Type.Object({
    page: Type.Number(),
    limit: Type.Number(),
    total: Type.Number(),
    totalPages: Type.Number(),
  }),
});
//#endregion

// TODO: implement proper error handling
export const ErrorSchema = Type.Object({
  error: Type.String(),
  message: Type.String(),
  statusCode: Type.Number(),
});
