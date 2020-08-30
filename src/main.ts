import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get<string>('PORT')

  app.useGlobalPipes(
    new ValidationPipe()
  );

  await app.listen(port);
}
bootstrap();
