import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedResponse } from 'src/shared/types';
import { FindOperator, Like, Repository } from 'typeorm';
import { UserDto } from './users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUsers({ page, perPage, name, email }): PaginatedResponse<UserDto> {
    const where = {} as Record<string, FindOperator<string>>;
    name && (where.name = Like('%' + name + '%'));
    email && (where.email = Like('%' + email + '%'));
    const [data, total] = await this.usersRepository.findAndCount({
      where,
      take: perPage,
      skip: page * perPage,
    });
    return { data, total, currentPage: page };
  }

  async getUserById(id: string): Promise<UserDto> {
    const data = await this.usersRepository.findOne({ id });
    return data;
  }
}
