import { Body, Controller, Post } from '@nestjs/common';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  @Post()
  createCustomer(@Body() customer: CreateCustomerDTO): string {
    return '/customer post endpoint';
  }
}
