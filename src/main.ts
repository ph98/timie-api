import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //enable cors
  app.enableCors({
    origin: ['http://localhost:3000', 'https://timie.date'],
  });
  await app.listen(5000);
  console.log('started!');
}
bootstrap();
