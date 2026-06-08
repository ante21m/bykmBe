import {
  Controller, Post, UseGuards, UseInterceptors, UploadedFile,
  HttpCode, HttpStatus, BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@ApiTags('upload')
@Controller('upload')
export class UploadController {
  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads'),
        filename: (_req, file, cb) => {
          const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          cb(null, name);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  @ApiOperation({ summary: 'Upload a file' })
  uploadFile(@UploadedFile() file: any) {
    if (!file) throw new BadRequestException('No file provided');
    return {
      url: `/uploads/${file.filename}`,
      name: file.originalname,
    };
  }
}
