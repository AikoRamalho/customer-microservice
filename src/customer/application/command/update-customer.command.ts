import { ICommand } from '@nestjs/cqrs';

export class UpdateCustomerCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly newId: string,
    readonly newName: string,
    readonly newDocument: number,
  ) {}
}
