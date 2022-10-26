import { Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { InjectionToken } from '../application/injection.token';
import { CustomerAggregateRoot } from './customer.aggregate';
import { CustomerRepository } from './customer.interface';

export class CustomerFactory {
  constructor(
    @Inject(InjectionToken.CUSTOMER_REPOSITORY)
    private readonly customerRepository: CustomerRepository,
  ) {}
  async create(name: string, document: number): Promise<CustomerAggregateRoot> {
    const id = randomUUID(); //criar como propriedade da classe automaticamente?
    const customerAggregate = new CustomerAggregateRoot(id, name, document);
    customerAggregate.createCustomerCreatedEvent();
    await this.customerRepository.create(customerAggregate);
    return customerAggregate;
  }
}
