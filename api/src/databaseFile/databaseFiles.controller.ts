import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  ClassSerializerInterceptor,
  Res,
  Req,
  Body,
  ParseIntPipe,
  HttpStatus,
  BadRequestException,
  Post,
} from '@nestjs/common';
import DatabaseFilesService from './databaseFiles.service';
import { Readable } from 'stream';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadExternalFileDto } from './upload-external-file.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

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

  @Post('/external')
  uploadExternalFile(@Body() body: UploadExternalFileDto) {
    console.log(body.fileUrl);
    return 0;
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Req() req,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(pdf|word|txt)/,
        })
        .addMaxSizeValidator({
          maxSize: parseInt(process.env.MAX_FILE_SIZE),
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.databaseFilesService.uploadDatabaseFile(
      file.buffer,
      file.originalname,
    );
  }
}
