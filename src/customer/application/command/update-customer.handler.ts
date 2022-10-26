import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CustomerProperties } from 'src/customer/domain/customer.aggregate';
import { CustomerRepository } from 'src/customer/domain/customer.interface';
import { InjectionToken } from '../injection.token';
import { UpdateCustomerCommand } from './update-customer.command';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler
  implements ICommandHandler<UpdateCustomerCommand, CustomerProperties>
{
  constructor(
    @Inject(InjectionToken.CUSTOMER_REPOSITORY)
    private readonly customerRepository: CustomerRepository,
  ) {}
  async execute(command: UpdateCustomerCommand): Promise<CustomerProperties> {
    const { id, newId, newName, newDocument } = command;
    const isNewIdAlreadyInUse =
      await this.customerRepository.checkIfNewIdAlreadyInUse(newId);

    if (isNewIdAlreadyInUse)
      throw new HttpException('conflito de ID', HttpStatus.CONFLICT);

    const customer = await this.customerRepository.findById(id);

    if (JSON.stringify(customer) === '{}') {
      throw new HttpException('cliente inexistente', HttpStatus.NOT_FOUND);
    }

    return this.customerRepository.update(id, newId, newName, newDocument);
  }
}
