import { HttpException, HttpStatus } from '@nestjs/common';
import Redis from 'ioredis';
import { CustomerQuery } from 'src/customer/application/query/customer.query';

export class CustomerQueryRedisImplement implements CustomerQuery {
  private static redis = new Redis({ host: 'redis' });
  async findById(id: string): Promise<any> {
    try {
      const customer = await CustomerQueryRedisImplement.redis.hgetall(
        `customer:${id}`,
      );
      return customer;
    } catch (e) {
      throw new HttpException('cache indisponivel', HttpStatus.BAD_GATEWAY);
    }
  }
}
