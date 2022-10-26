import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { CustomerAggregateRoot } from './customer.aggregate';

export class CustomerFactory {
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
  ) {}

  create(name: string, document: number): CustomerAggregateRoot {
    const id = randomUUID(); //criar como propriedade da classe automaticamente?
    const customerAggregate = new CustomerAggregateRoot(id, name, document);
    customerAggregate.createCustomerCreatedEvent();
    return customerAggregate;
  }
}
