import Redis from 'ioredis';
import {
  Customer,
  CustomerQuery,
} from 'src/customer/application/query/customer.query';

export class CustomerQueryRedisImplement implements CustomerQuery {
  private static redis = new Redis();
  async findById(id: string): Promise<Customer> {
    const customer = await CustomerQueryRedisImplement.redis.hgetall(
      `customer:${id}`,
    );
    return {
      id: customer.id,
      name: customer.name,
      document: customer.document,
    };
  }
}
