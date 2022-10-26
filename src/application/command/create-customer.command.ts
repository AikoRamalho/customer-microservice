import { ICommand } from '@nestjs/cqrs';

export class CreateCustomerCommand implements ICommand {
  constructor(readonly name: string, readonly document: number) {}
}
