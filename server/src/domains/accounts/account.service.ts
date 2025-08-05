import { Account } from './account.model';
import * as AccountDTO from './account.dto';
import {
  Account as AccountType,
  AccountListResponse,
  AccountQuery,
  CreateAccount,
  UpdateAccount,
} from './account.types';

export class AccountService {
  async create(data: CreateAccount): Promise<AccountType> {
    try {
      const account = await Account.create({
        name: data.name.trim(),
      });

      return AccountDTO.toResponse(account);
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Name already exists');
      }
      throw error;
    }
  }

  async findById(id: string): Promise<Account | null> {
    return Account.findByPk(id);
  }

  async findAll(query: AccountQuery = {}): Promise<AccountListResponse> {
    const { page = 1, limit = 20 } = query;
    const offset = (page - 1) * limit;

    const { count, rows: accounts } = await Account.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return AccountDTO.toListResponse(accounts, {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
    });
  }

  async update(id: string, data: UpdateAccount): Promise<Account | null> {
    const account = await Account.findByPk(id);

    if (!account) {
      return null;
    }

    await account.update({ name: data.name.trim() });

    return account;
  }

  async delete(id: string): Promise<boolean> {
    const result = await Account.destroy({
      where: { id },
    });

    return result > 0;
  }
}
