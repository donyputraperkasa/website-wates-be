import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload')
export class UploadController {
    @Post('article-image')
    @UseInterceptors(
        FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/articles',
            filename: (req, file, cb) => {
            const uniqueName =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueName + extname(file.originalname));
            },
        }),
        }),
    )
    uploadArticleImage(@UploadedFile() file: Express.Multer.File) {
        return {
        filename: file.filename,
        url: `/uploads/articles/${file.filename}`,
        };
    }

    @Post('activity-image')
    @UseInterceptors(
        FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/activities',
            filename: (req, file, cb) => {
            const uniqueName =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueName + extname(file.originalname));
            },
        }),
        }),
    )
    uploadActivityImage(@UploadedFile() file: Express.Multer.File) {
        return {
        filename: file.filename,
        url: `/uploads/activities/${file.filename}`,
        };
    }
}
