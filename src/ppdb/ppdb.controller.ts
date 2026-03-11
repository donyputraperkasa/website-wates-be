import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { PpdbService } from './ppdb.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdatePpdbStatusDto } from './dto/update-ppdb-status.dto';

@Controller('ppdb')
export class PpdbController {
    constructor(private ppdbService: PpdbService) {}

    @Post()
    create(@Body() body: any) {
        return this.ppdbService.create(body);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.ppdbService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateStatus(@Param('id') id: string, @Body() body: UpdatePpdbStatusDto) {
        return this.ppdbService.updateStatus(Number(id), body);
    }
}