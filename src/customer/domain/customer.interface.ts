import { CustomerAggregateRoot } from 'src/customer/domain/customer.aggregate';

export interface CustomerRepository {
  create(customer: CustomerAggregateRoot): Promise<void>;
}
