import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CustomerProperties } from 'src/customer/domain/customer.aggregate';
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
  async execute({
    name,
    document,
  }: CreateCustomerCommand): Promise<CustomerProperties> {
    try {
      const customer = this.eventPublisher.mergeObjectContext(
        await this.customerFactory.create(name, document),
      );
      customer.commit();
      return customer.getProperty();
    } catch (e) {
      throw new HttpException('cache indisponivel', HttpStatus.BAD_GATEWAY);
    }
  }
}
