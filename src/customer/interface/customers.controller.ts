import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { isUUID } from 'class-validator';
import { CreateCustomerCommand } from 'src/customer/application/command/create-customer.command';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(readonly commandBus: CommandBus) {}
  @Get(':id')
  getCustomerById(@Param() param): string {
    // na documentacao do desafio eh pedido para nao retornar id invalido
    // mas sabemos que se o id n for uuid o cliente ja n existe
    if (!isUUID(param.id)) {
      throw new HttpException('cliente inexistente', 404);
    }
    return param.id;
  }

  @Post()
  async createCustomer(@Body() body: CreateCustomerDTO): Promise<string> {
    const command = new CreateCustomerCommand(body.name, body.document);
    return await this.commandBus.execute(command);
  }
}
