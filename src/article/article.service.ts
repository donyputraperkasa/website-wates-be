import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticleService {
    constructor(private prisma: PrismaService) {}

    create(data: { title: string; content: string }, file?: Express.Multer.File) {
        return this.prisma.article.create({
            data: {
            ...data,
            image: file ? file.filename : null,
            },
        });
    }

    findAll() {
        return this.prisma.article.findMany({
        orderBy: { createdAt: 'desc' },
        });
    }

    findOne(id: number) {
        return this.prisma.article.findUnique({
        where: { id },
        });
    }

    update(
      id: number,
      data: { title?: string; content?: string },
      file?: Express.Multer.File,
    ) {
      return this.prisma.article.update({
        where: { id },
        data: {
          ...data,
          ...(file && { image: file.filename }),
        },
      });
    }

    remove(id: number) {
        return this.prisma.article.delete({
        where: { id },
        });
    }
}