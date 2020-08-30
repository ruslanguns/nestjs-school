import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const logger = new Logger('Bootstrap');
  const port = config.get<number>(SERVER_PORT);

  app.useGlobalPipes(
    new ValidationPipe()
  );

  await app.listen(port);
  logger.log(`Server is running at ${await app.getUrl()}`)
}
bootstrap();
