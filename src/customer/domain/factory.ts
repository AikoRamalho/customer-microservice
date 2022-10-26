import { CustomerAggregateRoot } from 'src/customer/domain/customer.aggregate';

export class CustomerFactory {
  create(id: string, name: string, document: number): CustomerAggregateRoot {
    //criar como propriedade da classe automaticamente?
    const customerAggregate = new CustomerAggregateRoot(id, name, document);
    return customerAggregate;
  }
}
