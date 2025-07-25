import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: __dirname + '/../../db.sqlite', // Caminho absoluto
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: true,
};
