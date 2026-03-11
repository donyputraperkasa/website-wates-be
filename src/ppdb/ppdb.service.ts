import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePpdbDto } from './dto/create-ppdb.dto';
import { UpdatePpdbStatusDto } from './dto/update-ppdb-status.dto';

@Injectable()
export class PpdbService {
    constructor(private prisma: PrismaService) {}

    create(dto: CreatePpdbDto) {
        return this.prisma.ppdb.create({
            data: dto,
        });
    }

    findAll() {
        return this.prisma.ppdb.findMany({
        orderBy: { createdAt: 'desc' },
        });
    }

    updateStatus(id: number, dto: UpdatePpdbStatusDto) {
        return this.prisma.ppdb.update({
            where: { id },
            data: { status: dto.status },
        });
    }
}