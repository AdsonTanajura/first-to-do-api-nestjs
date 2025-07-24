import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ListModule } from './list/list.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [ListModule, TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
