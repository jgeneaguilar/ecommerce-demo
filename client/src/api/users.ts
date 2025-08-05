import { api } from './api';
import { User, UserListResponse } from '@project/shared';

const baseURL = '/users';

export const getUsers = async (): Promise<UserListResponse> => {
  const res = await api.get<UserListResponse>(baseURL);

  return res.data;
};

export const createUser = async (data: Pick<User, 'name'>): Promise<User> => {
  const res = await api.post<User>(baseURL, data);

  return res.data;
};

export const updateUser = async (
  id: string,
  data: Pick<User, 'name'>
): Promise<User> => {
  const res = await api.put<User>(`${baseURL}/${id}`, data);

  return res.data;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const res = await api.delete<boolean>(`${baseURL}/${id}`);

  return res.data;
};
