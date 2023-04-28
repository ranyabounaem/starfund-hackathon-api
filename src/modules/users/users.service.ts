import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserInput } from './dtos/create-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(input: CreateUserInput): Promise<User> {
    let user = this.userRepository.create(input);
    user = await user.save();
    return user;
  }
}
