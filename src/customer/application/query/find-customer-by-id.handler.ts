import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectionToken } from '../injection.token';
import { CustomerQuery } from './customer.query';
import { FindCustomerByIdQuery } from './find-customer-by-id.query';
import { FindCustomerByIdResult } from './find-customer-by-id.result';

@QueryHandler(FindCustomerByIdQuery)
export class FindCustomerById
  implements IQueryHandler<FindCustomerByIdQuery, FindCustomerByIdResult>
{
  constructor(
    @Inject(InjectionToken.CUSTOMER_QUERY)
    readonly customerQuery: CustomerQuery,
  ) {}

  async execute(query: FindCustomerByIdQuery): Promise<FindCustomerByIdResult> {
    const customer = await this.customerQuery.findById(query.id);
    if (JSON.stringify(customer) === '{}') {
      throw new HttpException('cliente inexistente', HttpStatus.NOT_FOUND);
    }
    return {
      id: customer.id,
      name: customer.name,
      document: customer.document,
    };
  }
}
