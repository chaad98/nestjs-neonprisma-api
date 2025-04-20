import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Ip,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma } from 'generated/prisma';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@SkipThrottle() // This skips rate limiting for all routes in this controller (default is true)
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  // 'readonly' ensures the 'logger' property can't be reassigned after initialization
  // 'new MyLoggerService(EmployeesController.name)' creates a new logger instance for this controller
  // We pass 'EmployeesController.name' so that the logger labels logs with the controller's name
  // This makes it easier to identify and trace logs specific to this controller
  // Example log output: 'EmployeesController: Creating a new employee'
  private readonly logger = new MyLoggerService(EmployeesController.name);

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  @SkipThrottle({ default: false }) // This route will NOT skip rate limiting (rate limiting applies here)
  @Get()
  findAll(
    @Ip() ip: string,
    @Query('role') role?: 'SUPER_ADMIN' | 'ADMIN' | 'NORMAL_USER',
  ) {
    this.logger.log(
      `Request for ALL Employees\t${ip}`,
      EmployeesController.name,
    );
    return this.employeesService.findAll(role);
  }

  @Throttle({ short: { ttl: 1000, limit: 1 } }) // Overrides the default throttle settings from app.module.ts; applies the "short" strategy with max 1 request per 1 second (ttl = 1000ms, limit = 1) for this specific route
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
