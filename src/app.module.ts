import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from './article/article.module';
import { ActivityModule } from './activity/activity.module';
import { PpdbModule } from './ppdb/ppdb.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    PrismaModule, 
    AuthModule, 
    ArticleModule, 
    ActivityModule, 
    PpdbModule, 
    UploadModule,
    ConfigModule.forRoot({ isGlobal: true }), 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
