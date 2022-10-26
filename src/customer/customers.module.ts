import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCustomerHandler } from 'src/customer/application/command/create-customer.handler';
import { CustomerCreatedHandler } from './application/event/customer-created.handler';
import { InjectionToken } from './application/injection.token';
import { CustomerFactory } from './domain/customer.factory';
import { CustomerRepositoryRedis } from './infra/repository/customer.repository';
import { CustomersController } from './interface/customers.controller';

const infra: Provider[] = [
  {
    provide: InjectionToken.CUSTOMER_REPOSITORY,
    useClass: CustomerRepositoryRedis,
  },
];

const application = [CreateCustomerHandler, CustomerCreatedHandler];

const domain = [CustomerFactory];

@Module({
  imports: [CqrsModule],
  controllers: [CustomersController],
  providers: [...infra, ...application, ...domain],
})
export class CustomersModule {}
