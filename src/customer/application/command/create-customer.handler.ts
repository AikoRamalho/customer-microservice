import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CustomerFactory } from 'src/customer/domain/customer.factory';
import { CreateCustomerCommand } from './create-customer.command';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly customerFactory: CustomerFactory,
  ) {}
  async execute({ name, document }: CreateCustomerCommand): Promise<string> {
    try {
      const customer = this.eventPublisher.mergeObjectContext(
        await this.customerFactory.create(name, document),
      );
      customer.commit();
      return JSON.stringify(customer);
    } catch (e) {
      throw new HttpException('cache indisponivel', HttpStatus.BAD_GATEWAY);
    }
  }
}
