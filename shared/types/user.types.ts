import { Static } from '@sinclair/typebox';
import {
  UserListResponseSchema,
  UserQuerySchema,
  UserResponseSchema,
  UserSchema,
  CreateUserSchema,
  UpdateUserSchema,
} from '../schemas/user.schemas';

export type User = Static<typeof UserSchema>;
export type CreateUser = Static<typeof CreateUserSchema>;
export type UpdateUser = Static<typeof UpdateUserSchema>;
export type UserQuery = Static<typeof UserQuerySchema>;
export type UserResponse = Static<typeof UserResponseSchema>;
export type UserListResponse = Static<typeof UserListResponseSchema>;
