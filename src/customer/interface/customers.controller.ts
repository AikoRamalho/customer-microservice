import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCustomerCommand } from 'src/application/command/create-customer.command';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(readonly commandBus: CommandBus) {}
  @Post()
  async createCustomer(@Body() body: CreateCustomerDTO): Promise<string> {
    const command = new CreateCustomerCommand(body.name, body.document);
    return await this.commandBus.execute(command);
  }
}
