import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseFilesService from './databaseFiles.service';
import DatabaseFilesController from './databaseFiles.controller';
import DatabaseFile from './databaseFile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DatabaseFile])],
  providers: [DatabaseFilesService],
  controllers: [DatabaseFilesController],
})
export class DatabaseFileModule {}
