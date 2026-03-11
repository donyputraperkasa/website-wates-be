import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards, ParseIntPipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
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
                const filename = Date.now() + '-' + file.originalname;
                cb(null, filename);
            },
            }),
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
                const filename = Date.now() + '-' + file.originalname;
                cb(null, filename);
            },
            }),
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