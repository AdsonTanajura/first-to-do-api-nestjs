import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserFactory } from './user.factory';
import { AwsService } from 'src/aws/aws.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserFactory, AwsService],
  exports: [UserService],
})
export class UserModule {}
