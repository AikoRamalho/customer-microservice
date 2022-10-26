import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCustomerHandler } from 'src/customer/application/command/create-customer.handler';
import { CustomerCreatedHandler } from './application/event/customer-created.handler';
import { CustomerFactory } from './domain/customer.factory';
import { CustomersController } from './interface/customers.controller';

const application = [CreateCustomerHandler, CustomerCreatedHandler];

const domain = [CustomerFactory];

@Module({
  imports: [CqrsModule],
  controllers: [CustomersController],
  providers: [...application, ...domain],
})
export class CustomersModule {}
