import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { MyLoggerService } from './my-logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // bufferLogs: true, // Ensures that logs are buffered before the application is fully initialized
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // app.useLogger(app.get(MyLoggerService)); // Replaces the default logger with a custom logger (MyLoggerService) for the app
  app.enableCors(); // right now this allow every domain to connect this backend API, but we can set it later and create an array to allow multiple domains to connect
  app.setGlobalPrefix('api'); // this set global endpoint to /api then the rest will follow with any existing controllers enpoint. example - /api/users
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
