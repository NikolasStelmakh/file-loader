import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  ClassSerializerInterceptor,
  Res,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import DatabaseFilesService from './databaseFiles.service';
import { Readable } from 'stream';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
@UseInterceptors(ClassSerializerInterceptor)
export default class DatabaseFilesController {
  constructor(private readonly databaseFilesService: DatabaseFilesService) {}

  @Get(':id')
  async getDatabaseFileById(
    @Res() response: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const file = await this.databaseFilesService.getFileById(id);

    const stream = Readable.from(file.data);
    stream.pipe(response);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
