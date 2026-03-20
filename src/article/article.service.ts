import { Injectable, NotFoundException } from '@nestjs/common';
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

    async findOne(id: number) {
        const article = await this.prisma.article.findUnique({
            where: { id },
        });

        if (!article) {
            throw new NotFoundException('Article not found');
        }

        return article;
    }

    update(
      id: number,
      data: { title?: string; content?: string },
      file?: Express.Multer.File,
    ) {
      const updateData: any = {};

      if (data.title) updateData.title = data.title;
      if (data.content) updateData.content = data.content;
      if (file) updateData.image = file.filename;

      return this.prisma.article.update({
        where: { id },
        data: updateData,
      });
    }

    remove(id: number) {
        return this.prisma.article.delete({
        where: { id },
        });
    }
}