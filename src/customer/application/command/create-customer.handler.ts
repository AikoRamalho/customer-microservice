import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { CustomerAggregateRoot } from 'src/customer/domain/customer.aggregate';
import { CreateCustomerCommand } from './create-customer.command';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
  ) {}
  async execute(command: CreateCustomerCommand): Promise<string> {
    const customerAggregate = new CustomerAggregateRoot(
      randomUUID(),
      command.name,
      command.document,
    );
    const customer = this.eventPublisher.mergeObjectContext(
      customerAggregate.createCustomer(),
    );
    console.log('customer ', customer);
    customer.commit();
    return `Customer ${command.name} created`;
  }
}
