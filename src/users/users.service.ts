import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(user: User): User {
    this.users.push(user);

    return user;
  }

  findOne(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }
}
