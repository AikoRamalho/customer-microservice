import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCustomerHandler } from 'src/customer/application/command/create-customer.handler';
import { CustomersController } from './interface/customers.controller';

const application = [CreateCustomerHandler];

@Module({
  imports: [CqrsModule],
  controllers: [CustomersController],
  providers: [...application],
})
export class CustomersModule {}
