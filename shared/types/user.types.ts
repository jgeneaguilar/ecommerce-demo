import { Static } from '@sinclair/typebox';
import {
  UserListResponseSchema,
  UserListQuerySchema,
  UserResponseSchema,
  UserSchema,
  CreateUserSchema,
  UpdateUserSchema,
  UserParamsSchema,
} from '../schemas/user.schemas';

export type User = Static<typeof UserSchema>;
export type CreateUser = Static<typeof CreateUserSchema>;
export type UpdateUser = Static<typeof UpdateUserSchema>;
export type UserParams = Static<typeof UserParamsSchema>;
export type UserListQuery = Static<typeof UserListQuerySchema>;
export type UserResponse = Static<typeof UserResponseSchema>;
export type UserListResponse = Static<typeof UserListResponseSchema>;
