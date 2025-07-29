import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from 'src/dto/register-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(AuthGuard('jwt'))
  @Post('upload-profile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfile(@UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadProfileImage(file);
  }
}
