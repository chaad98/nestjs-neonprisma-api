import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

/*
NOTES-----
 - Controller file is to handle HTTP requests
 - Routing mechanism determines which controller will handle each request
 - Often, a controller has multiple routes, and each route can perform a different action.
*/

@Controller() // This is we call decorator. If i want to group the route i can just write like @Controller('dota'), meaning that it will become /dota endpoint
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // This is we call a HTTP Request Method. Also, if the controller prefix is dota and the method decorator is @Get('invoker'), the resulting route will be GET /dota/invoker
  getHello(): string {
    return this.appService.getHello(); // This is we call a function method. You can random name of your function method, easy :D
  }
}
