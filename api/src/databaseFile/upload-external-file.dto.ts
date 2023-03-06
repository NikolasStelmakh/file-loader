import { IsUrl, IsNotEmpty } from 'class-validator';

export class UploadExternalFileDto {
  @IsUrl()
  @IsNotEmpty()
  fileUrl: string;
}
