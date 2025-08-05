import { User } from './user.model';
import { User as UserType, UserListResponse } from '@project/shared';

export const toResponse = (user: User): UserType => {
  return {
    id: user.id,
    name: user.name,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
};

export const toListResponse = (
  users: User[],
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
): UserListResponse => {
  return {
    users: users.map((user) => toResponse(user)),
    pagination,
  };
};
