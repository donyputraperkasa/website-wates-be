import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activities')
export class ActivityController {
    constructor(private activityService: ActivityService) {}

    @Get()
    findAll() {
        return this.activityService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: CreateActivityDto) {
        return this.activityService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateActivityDto) {
        return this.activityService.update(Number(id), dto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.activityService.remove(Number(id));
    }
}