import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { PaginatedResponse } from 'src/shared/types';
import { UserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'email',
    type: String,
    required: false,
  })
  @Get()
  getUsers(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('name') name: number,
    @Query('email') email: number,
  ): PaginatedResponse<UserDto> {
    return this.usersService.getUsers({ page, perPage, name, email });
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: string): Promise<UserDto> {
    return this.usersService.getUserById(userId);
  }
}
