import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ListModule } from './list/list.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [
    ListModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AwsModule,
  ],
  controllers: [AppController, UserController],
})
export class AppModule {}
