import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCustomerCommand } from './create-customer.command';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  async execute(command: CreateCustomerCommand): Promise<string> {
    return `Customer ${command.name} created`;
  }
}
