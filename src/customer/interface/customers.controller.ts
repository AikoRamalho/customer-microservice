import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCustomerCommand } from 'src/customer/application/command/create-customer.command';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { FindCustomerByIdParamDto } from './dto/find-customer-by-id.param.dto';

@Controller('customers')
export class CustomersController {
  constructor(readonly commandBus: CommandBus) {}
  @Get(':id')
  getCustomerById(@Param() param: FindCustomerByIdParamDto): string {
    return param.id;
  }

  @Post()
  async createCustomer(@Body() body: CreateCustomerDTO): Promise<string> {
    const command = new CreateCustomerCommand(body.name, body.document);
    return await this.commandBus.execute(command);
  }
}
