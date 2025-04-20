import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // This getHello() is the method that returns (giving back actual output) data to you
    return 'Hello World!';
  }
}
