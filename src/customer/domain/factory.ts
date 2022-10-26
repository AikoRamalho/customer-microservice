import { Inject } from '@nestjs/common';
import { InjectionToken } from 'src/customer/application/injection.token';
import { CustomerAggregateRoot } from 'src/customer/domain/customer.aggregate';
import { CustomerRepository } from 'src/customer/domain/customer.interface';

export class CustomerFactory {
  constructor(
    @Inject(InjectionToken.CUSTOMER_REPOSITORY)
    private readonly customerRepository: CustomerRepository,
  ) {}
  create(id: string, name: string, document: number): CustomerAggregateRoot {
    //criar como propriedade da classe automaticamente?
    const customerAggregate = new CustomerAggregateRoot(id, name, document);
    return customerAggregate;
  }
}
