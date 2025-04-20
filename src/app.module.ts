import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module';

// This is our root module for our application
@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeesModule,
    ThrottlerModule.forRoot([
      {
        name: 'short', // Configuration for short-term rate limiting
        ttl: 1000, // Time-to-live (TTL): 1000ms (1 second)
        limit: 3, // Max 3 requests per second
      },
      {
        name: 'long', // Configuration for long-term rate limiting
        ttl: 60000, // TTL: 60000ms (1 minute)
        limit: 100, // Max 100 requests per minute
      },
    ]),
    MyLoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // Set ThrottlerGuard as a global guard via APP_GUARD token; Applies rate limiting to every route in the app using ThrottlerGuard
    },
  ],
})
export class AppModule {}
