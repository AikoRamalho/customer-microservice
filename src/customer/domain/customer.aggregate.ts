import { AggregateRoot } from '@nestjs/cqrs';
import { CustomerCreatedEvent } from './event/customer-created.event';

export interface CustomerProperties {
  id: string;
  name: string;
  document: number;
}

export class CustomerAggregateRoot extends AggregateRoot {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly document: number,
  ) {
    super();
  }

  createCustomerCreatedEvent(): CustomerAggregateRoot {
    this.apply(new CustomerCreatedEvent(this.id, this.name, this.document));
    return this;
  }

  getProperty(): CustomerProperties {
    return {
      id: this.id,
      name: this.name,
      document: this.document,
    };
  }
}
