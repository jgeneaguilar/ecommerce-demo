import { Account } from './account.model';
import { Account as AccountType, AccountListResponse } from './account.types';

export const toResponse = (account: Account): AccountType => {
  return {
    id: account.id,
    name: account.name,
    createdAt: account.createdAt.toISOString(),
    updatedAt: account.updatedAt.toISOString(),
  };
};

export const toListResponse = (
  accounts: Account[],
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
): AccountListResponse => {
  return {
    accounts: accounts.map((account) => toResponse(account)),
    pagination,
  };
};
