export interface Account {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccountListResponse {
  accounts: Account[];
  pagination: {
    limit?: number;
    page: number;
    total: number;
    totalPages: number;
  };
}
