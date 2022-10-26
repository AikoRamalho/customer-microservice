import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { CustomerProperties } from 'src/customer/domain/customer.aggregate';
import { CustomerRepository } from 'src/customer/domain/customer.interface';
import { CustomerFactory } from 'src/customer/domain/factory';
import { InjectionToken } from '../../injection.token';
import { CreateCustomerCommand } from './create-customer.command';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(
    @Inject(InjectionToken.CUSTOMER_REPOSITORY)
    private readonly customerRepository: CustomerRepository,
    private readonly customerFactory: CustomerFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}
  async execute({
    name,
    document,
  }: CreateCustomerCommand): Promise<CustomerProperties> {
    const id = randomUUID();

    const aggregateCustomer = this.customerFactory.create(id, name, document);
    aggregateCustomer.applyCustomerCreatedEvent();

    const customer = this.eventPublisher.mergeObjectContext(aggregateCustomer);

    await this.customerRepository.create(customer);

    customer.commit();

    return customer.getProperty();
  }
}
