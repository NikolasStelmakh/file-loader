import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseFile from './databaseFile/databaseFile.entity';
import { DatabaseFileModule } from './databaseFile/databaseFile.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities: [DatabaseFile],
      synchronize: true,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
    }),
    DatabaseFileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
