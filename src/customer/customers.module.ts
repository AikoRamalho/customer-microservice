import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCustomerHandler } from 'src/customer/application/command/create-customer/create-customer.handler';
import { UpdateCustomerHandler } from './application/command/update-customer.handler';
import { CustomerCreatedHandler } from './application/event/customer-created.handler';
import { InjectionToken } from './application/injection.token';
import { FindCustomerById } from './application/query/find-customer-by-id.handler';
import { AuthenticationModule } from './auth/auth.module';
import { CustomerFactory } from './domain/factory';
import { CustomerQueryRedisImplement } from './infra/query/customer.query';
import { CustomerRepositoryRedis } from './infra/repository/customer.repository';
import { CustomersController } from './interface/customers.controller';

const infra: Provider[] = [
  {
    provide: InjectionToken.CUSTOMER_REPOSITORY,
    useClass: CustomerRepositoryRedis,
  },
  {
    provide: InjectionToken.CUSTOMER_QUERY,
    useClass: CustomerQueryRedisImplement,
  },
];

const application = [
  CreateCustomerHandler,
  CustomerCreatedHandler,
  FindCustomerById,
  UpdateCustomerHandler,
];

const domain = [CustomerFactory];

@Module({
  imports: [CqrsModule, AuthenticationModule],
  controllers: [CustomersController],
  providers: [...infra, ...application, ...domain],
})
export class CustomersModule {}
