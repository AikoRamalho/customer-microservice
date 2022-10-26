import {
  CustomerAggregateRoot,
  CustomerProperties,
} from 'src/customer/domain/customer.aggregate';

export interface CustomerRepository {
  create(customer: CustomerAggregateRoot): Promise<void>;
  checkIfNewIdAlreadyInUse(id: string): Promise<boolean>;
  findById(id: string): Promise<void>;
  update(
    id: string,
    newId: string,
    newName: string,
    newDocument: number,
  ): Promise<CustomerProperties>;
}
