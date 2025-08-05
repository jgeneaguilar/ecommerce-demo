import { User } from './user.model';
import * as UserDTO from './user.dto';
import {
  User as UserType,
  UserListResponse,
  UserQuery,
  CreateUser,
  UpdateUser,
} from '@project/shared';

export class UserService {
  async create(data: CreateUser): Promise<UserType> {
    try {
      const user = await User.create({
        name: data.name.trim(),
      });

      return UserDTO.toResponse(user);
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Name already exists');
      }
      throw error;
    }
  }

  async findById(id: string): Promise<User | null> {
    return User.findByPk(id);
  }

  async findAll(query: UserQuery = {}): Promise<UserListResponse> {
    const { page = 1, limit = 20 } = query;
    const offset = (page - 1) * limit;

    const { count, rows: users } = await User.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return UserDTO.toListResponse(users, {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
    });
  }

  async update(id: string, data: UpdateUser): Promise<User | null> {
    const user = await User.findByPk(id);

    if (!user) {
      return null;
    }

    await user.update({ name: data.name.trim() });

    return user;
  }

  async delete(id: string): Promise<boolean> {
    const result = await User.destroy({
      where: { id },
    });

    return result > 0;
  }
}
