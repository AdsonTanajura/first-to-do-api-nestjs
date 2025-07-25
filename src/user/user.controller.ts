import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from 'src/dto/register-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() { email, name, password }: RegisterUserDto) {
    return this.userService.registerUser({ email, name, password });
  }

  @Get('all')
  async findAllUsers() {
    return this.userService.findAllUsers();
  }
}
