import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CustomerCreatedEvent } from 'src/customer/domain/event/customer-created.event';

@EventsHandler(CustomerCreatedEvent)
export class CustomerCreatedHandler
  implements IEventHandler<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent) {
    console.log(`Customer ${event.name} event handled`);
  }
}
