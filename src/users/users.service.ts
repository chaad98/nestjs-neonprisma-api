import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Albert Einstein',
      email: 'albert.einstein@example.com',
      role: 'SUPER_ADMIN',
    },
    {
      id: 2,
      name: 'Isaac Newton',
      email: 'isaac.newton@example.com',
      role: 'ADMIN',
    },
    {
      id: 3,
      name: 'Brian Cox',
      email: 'brian.cox@example.com',
      role: 'NORMAL_USER',
    },
    {
      id: 4,
      name: 'Stephen Hawking',
      email: 'stephen.hawking@example.com',
      role: 'SUPER_ADMIN',
    },
  ];

  findAll(role?: 'SUPER_ADMIN' | 'ADMIN' | 'NORMAL_USER') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);

      if (!rolesArray.length) {
        throw new NotFoundException(
          `No users with role '${role.toUpperCase()}' found`,
        );
      }

      return rolesArray;
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User ${id} not found!`);
    }

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };

    this.users.push(newUser);
    return newUser;
  }

  updateOne(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  removeOne(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
