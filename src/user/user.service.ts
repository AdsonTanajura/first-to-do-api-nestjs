import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { RegisterUserDto } from 'src/dto/register-user.dto';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async registerUser({
    email,
    name,
    password,
  }: RegisterUserDto): Promise<User> {
    const formtEmail = email.toLowerCase().replace(/\s/g, '');
    const emailExists = await this.emailExists(formtEmail);

    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }

    const id = crypto.randomUUID();
    const fortId = 'user-' + id;
    const formatName = name.toLowerCase().trim();

    const user = this.userRepository.create({
      name: formatName,
      email: formtEmail,
      password,
      id: fortId,
    });

    this.userRepository.save(user);

    const userWithoutPassword = { ...user, password: '' };

    return userWithoutPassword;
  }

  async emailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email: email },
      select: ['id'],
    });
    return !!user;
  }

  async findAllUsers(): Promise<User[]> {
    const users = this.userRepository.find();
    return users;
  }
}
