import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable global validation for DTO
  app.useGlobalPipes(new ValidationPipe());

  // Serve uploaded files from /uploads
  app.useStaticAssets('uploads', {
    prefix: '/uploads',
  });

  // Enable CORS
  app.enableCors({
    origin: '*', 
    // kalau sudah ada FE "*"" nya diganti pake link FE
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Start server
  await app.listen(process.env.PORT ?? 4000);
const url = await app.getUrl();

  console.log(`
  🚀 ==========================================
        WEBSITE WATES BACKEND SERVER
  ==========================================

  ✅ Server Status : RUNNING
  🌐 Local URL     : ${url}
  📅 Started At    : ${new Date().toLocaleString()}

  ==========================================
  `);
}
bootstrap();
