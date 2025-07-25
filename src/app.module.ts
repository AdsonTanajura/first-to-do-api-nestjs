import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ListModule } from './list/list.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [ListModule, TypeOrmModule.forRoot(typeOrmConfig), UserModule],
  controllers: [AppController, UserController],
})
export class AppModule {}
