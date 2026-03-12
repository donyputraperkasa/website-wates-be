import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('activities')
export class ActivityController {
    constructor(private activityService: ActivityService) {}

    @Get()
    findAll() {
        return this.activityService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.activityService.findOne(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueName + extname(file.originalname));
            },
            }),
        }),
    )
    create(
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: CreateActivityDto,
    ) {
        return this.activityService.create({
            ...dto,
            image: file ? file.filename : undefined,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueName + extname(file.originalname));
            },
            }),
        }),
    )
    update(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: UpdateActivityDto,
        ) {
        return this.activityService.update(Number(id), {
            ...dto,
            image: file ? file.filename : dto.image,
        });
        }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.activityService.remove(Number(id));
    }
}