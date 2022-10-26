import { IQueryResult } from '@nestjs/cqrs';

export class FindCustomerByIdResult implements IQueryResult {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly document: string,
  ) {}
}
