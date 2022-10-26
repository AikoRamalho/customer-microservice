import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { isUUID } from 'class-validator';
import { CreateCustomerCommand } from 'src/customer/application/command/create-customer.command';
import { FindCustomerByIdQuery } from '../application/query/find-customer-by-id.query';
import { FindCustomerByIdResponseDTO } from './dto/find-customer-by-id.response.dto';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateCustomerParam } from './dto/update-customer.param.dto';
import { UpdateCustomerBodyDTO } from './dto/update-customer.body.dto';

@Controller('customers')
export class CustomersController {
  constructor(readonly queryBus: QueryBus, readonly commandBus: CommandBus) {}

  @Get(':id')
  async getCustomerById(@Param() param): Promise<FindCustomerByIdResponseDTO> {
    // na documentacao do desafio eh pedido para nao retornar id invalido
    // mas sabemos que se o id n for uuid o cliente ja n existe
    if (!isUUID(param.id)) {
      throw new HttpException('cliente inexistente', 404);
    }
    const query = new FindCustomerByIdQuery(param.id);
    return await this.queryBus.execute(query);
  }

  @Post()
  async createCustomer(@Body() body: CreateCustomerDTO): Promise<string> {
    const command = new CreateCustomerCommand(body.name, body.document);
    return await this.commandBus.execute(command);
  }

  @Put(':id')
  updateCustomer(
    @Param() param: UpdateCustomerParam,
    @Body() body: UpdateCustomerBodyDTO,
  ): string {
    return `This action updates a #${param.id} customer`;
  }
}
