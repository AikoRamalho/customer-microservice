import { IQuery } from '@nestjs/cqrs';

export class FindCustomerByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
