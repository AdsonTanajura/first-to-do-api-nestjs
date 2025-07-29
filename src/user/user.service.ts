import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { RegisterUserDto } from 'src/dto/register-user.dto';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserFactory } from './user.factory';
import { UserResponseDto } from './dto/use-responde.dto';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userFactory: UserFactory,
    private readonly awsService: AwsService
  ) {}

  async registerUser({
    email,
    name,
    password,
  }: RegisterUserDto): Promise<UserResponseDto> {
    const user = this.userFactory.createUser({
      email,
      name,
      password,
    });

    if (await this.emailExists(user.email)) {
      throw new BadRequestException('Email already exists');
    }
    await this.userRepository.save(user);

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword as UserResponseDto;
  }

  async uploadProfileImage(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const url = await this.awsService.uploadFile(file, 'profile-images');

    // Aqui você pode atualizar o usuário com a URL:
    // await this.userRepository.update(userId, { profileImage: url });

    return { url };
  }

  async emailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email: email },
      select: ['id'],
    });
    return !!user;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find({
      select: ['id', 'name', 'email'],
    });
    return users;
  }
}
