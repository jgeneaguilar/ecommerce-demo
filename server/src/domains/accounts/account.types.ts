import { Static } from '@sinclair/typebox';
import {
  AccountListResponseSchema,
  AccountQuerySchema,
  AccountResponseSchema,
  AccountSchema,
  CreateAccountSchema,
  UpdateAccountSchema,
} from './account.schemas';

export type Account = Static<typeof AccountSchema>;
export type CreateAccount = Static<typeof CreateAccountSchema>;
export type UpdateAccount = Static<typeof UpdateAccountSchema>;
export type AccountQuery = Static<typeof AccountQuerySchema>;
export type AccountResponse = Static<typeof AccountResponseSchema>;
export type AccountListResponse = Static<typeof AccountListResponseSchema>;
