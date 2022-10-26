import { IEvent } from '@nestjs/cqrs';

export class CustomerCreatedEvent implements IEvent {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly document: number,
  ) {}
}
