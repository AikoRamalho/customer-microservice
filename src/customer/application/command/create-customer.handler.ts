import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CustomerFactory } from 'src/customer/domain/customer.factory';
import { CreateCustomerCommand } from './create-customer.command';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
    private readonly customerFactory: CustomerFactory,
  ) {}
  async execute({ name, document }: CreateCustomerCommand): Promise<string> {
    const customer = this.eventPublisher.mergeObjectContext(
      this.customerFactory.create(name, document),
    );
    customer.commit();
    return `Customer ${name} created`;
  }
}
