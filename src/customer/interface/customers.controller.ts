import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { isUUID } from 'class-validator';
import { CreateCustomerCommand } from 'src/customer/application/command/create-customer/create-customer.command';
import { FindCustomerByIdQuery } from '../application/query/find-customer-by-id.query';
import { FindCustomerByIdResponseDTO } from './dto/find-customer-by-id.response.dto';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateCustomerParamDTO } from './dto/update-customer.param.dto';
import { UpdateCustomerBodyDTO } from './dto/update-customer.body.dto';
import { CustomerProperties } from '../domain/customer.aggregate';
import { UpdateCustomerCommand } from '../application/command/update-customer.command';
import { AuthenticationGuard } from '../auth/auth.guard';

@UseGuards(AuthenticationGuard)
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
  async createCustomer(
    @Body() body: CreateCustomerDTO,
  ): Promise<CustomerProperties> {
    const command = new CreateCustomerCommand(body.name, body.document);
    return await this.commandBus.execute(command);
  }

  @Put(':id')
  async updateCustomer(
    @Param() param: UpdateCustomerParamDTO,
    @Body() body: UpdateCustomerBodyDTO,
  ): Promise<CustomerProperties> {
    const command = new UpdateCustomerCommand(
      param.id,
      body.id,
      body.name,
      body.document,
    );
    return await this.commandBus.execute(command);
  }
}
