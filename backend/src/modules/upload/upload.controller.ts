import {
  Controller, Get, Post, Param, UseGuards, UseInterceptors,
  UploadedFile, HttpCode, HttpStatus, BadRequestException,
  NotFoundException, Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { extname, join, resolve, basename } from 'path';
import { existsSync } from 'fs';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

const ALLOWED_MIMES = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
];

@ApiTags('upload')
@Controller()
export class UploadController {
  @Post('upload')
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
      fileFilter: (_req, file, cb) => {
        if (ALLOWED_MIMES.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new BadRequestException(`File type ${file.mimetype} is not allowed`), false);
        }
      },
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  @ApiOperation({ summary: 'Upload a file' })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file provided');
    return {
      url: `/uploads/${file.filename}`,
      name: file.originalname,
    };
  }

  @Get('uploads/:filename')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Serve an uploaded file' })
  serveFile(@Param('filename') filename: string, @Res() res: Response) {
    const safeName = basename(filename);
    const uploadsDir = resolve(process.cwd(), 'uploads');
    const filePath = resolve(uploadsDir, safeName);
    if (!filePath.startsWith(uploadsDir)) {
      throw new NotFoundException('File not found');
    }
    if (!existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }
    res.sendFile(filePath);
  }
}
