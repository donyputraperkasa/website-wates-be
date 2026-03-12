import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivityService {
    constructor(private prisma: PrismaService) {}

    create(dto: CreateActivityDto) {
        return this.prisma.activity.create({
            data: {
                title: dto.title,
                description: dto.description,
                image: dto.image,
                date: new Date(),
            },
        });
    }

    findAll() {
        return this.prisma.activity.findMany({
        orderBy: { date: 'desc' },
        });
    }

    findOne(id: number) {
        return this.prisma.activity.findUnique({
            where: { id },
        });
    }

/*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Updates an activity with the given id and data.
     * @param id the id of the activity to update
     * @param dto the data to update the activity with
     * @returns the updated activity
     */
/*******  f90a20dd-cbef-4371-b0da-987df15eef53  *******/
    update(id: number, dto: UpdateActivityDto) {
        const data = {
            ...dto,
            ...(dto.date && { date: new Date(dto.date) }),
            ...(dto.image && { image: dto.image }),
        };

        return this.prisma.activity.update({
            where: { id },
            data,
        });
    }

    remove(id: number) {
        return this.prisma.activity.delete({
        where: { id },
        });
    }
}