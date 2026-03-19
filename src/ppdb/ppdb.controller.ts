import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { PpdbService } from './ppdb.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePpdbDto } from './dto/create-ppdb.dto';
import { UpdatePpdbStatusDto } from './dto/update-ppdb-status.dto';

@Controller('ppdb')
export class PpdbController {
    constructor(private ppdbService: PpdbService) {}

    @Post()
    create(@Body() body: CreatePpdbDto) {
        return this.ppdbService.create(body);
    }

    @Get('public')
    findPublic() {
        return this.ppdbService.findAll();
    }

    // Admin only
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.ppdbService.findAll();
    }

    // Public update (for now, can secure later)
    @Patch(':id')
    updateStatus(@Param('id') id: string, @Body() body: UpdatePpdbStatusDto) {
        return this.ppdbService.updateStatus(Number(id), body);
    }
}