import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards, ParseIntPipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ArticleService } from './article.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticleController {
    constructor(private articleService: ArticleService) {}

    @Get()
    findAll() {
        return this.articleService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe ) id: number) {
        return this.articleService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/articles',
                filename: (req, file, cb) => {
                    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, uniqueName + extname(file.originalname));
                },
            }),
            fileFilter: (req, file, cb) => {
                if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                    return cb(new Error('Only image files allowed'), false);
                }
                cb(null, true);
            },
            limits: {
                fileSize: 2 * 1024 * 1024,
            },
        }),
    )
    create(
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: CreateArticleDto,
    ) {
        return this.articleService.create(dto, file);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/articles',
                filename: (req, file, cb) => {
                    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, uniqueName + extname(file.originalname));
                },
            }),
            fileFilter: (req, file, cb) => {
                if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                    return cb(new Error('Only image files allowed'), false);
                }
                cb(null, true);
            },
            limits: {
                // batasi file 2mb
                fileSize: 2 * 1024 * 1024,
            },
        }),
    )
    update(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: UpdateArticleDto,
    ) {
        return this.articleService.update(id, dto, file);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.articleService.remove(id);
    }
}