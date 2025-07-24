import { api } from './api';
import { Account, AccountListResponse } from '../types/accounts';

const baseURL = '/accounts';

export const getAccounts = async (): Promise<AccountListResponse> => {
  const res = await api.get<AccountListResponse>(baseURL);

  return res.data;
};

export const createAccount = async (
  data: Pick<Account, 'name'>
): Promise<Account> => {
  const res = await api.post<Account>(baseURL, data);

  return res.data;
};

export const updateAccount = async (
  id: string,
  data: Pick<Account, 'name'>
): Promise<Account> => {
  const res = await api.put<Account>(`${baseURL}/${id}`, data);

  return res.data;
};

export const deleteAccount = async (id: string): Promise<boolean> => {
  const res = await api.delete<boolean>(`${baseURL}/${id}`);

  return res.data;
};
