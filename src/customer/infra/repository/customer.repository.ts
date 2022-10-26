import Redis from 'ioredis';
import { CustomerAggregateRoot } from 'src/customer/domain/customer.aggregate';
import { CustomerRepository } from 'src/customer/domain/customer.interface';

export class CustomerRepositoryRedis implements CustomerRepository {
  private static redis = new Redis();

  async create(customer: CustomerAggregateRoot): Promise<void> {
    await CustomerRepositoryRedis.redis.hmset(`customer:${customer.id}`, {
      id: customer.id,
      name: customer.name,
      document: customer.document,
    });
  }
}
