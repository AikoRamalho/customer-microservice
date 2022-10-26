import { HttpException, HttpStatus } from '@nestjs/common';
import Redis from 'ioredis';
import {
  CustomerAggregateRoot,
  CustomerProperties,
} from 'src/customer/domain/customer.aggregate';
import { CustomerRepository } from 'src/customer/domain/customer.interface';

export class CustomerRepositoryRedis implements CustomerRepository {
  private static redis = new Redis();

  async create(customer: CustomerAggregateRoot): Promise<void> {
    try {
      await CustomerRepositoryRedis.redis.hmset(`customer:${customer.id}`, {
        id: customer.id,
        name: customer.name,
        document: customer.document,
      });
    } catch (e) {
      throw new HttpException('cache indisponivel', HttpStatus.BAD_GATEWAY);
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const customer = await CustomerRepositoryRedis.redis.hgetall(
        `customer:${id}`,
      );
      return customer;
    } catch (e) {
      throw new HttpException('cache indisponivel', HttpStatus.BAD_GATEWAY);
    }
  }

  async update(
    id: string,
    newId: string,
    newName: string,
    newDocument: number,
  ): Promise<CustomerProperties> {
    try {
      await CustomerRepositoryRedis.redis.hdel(
        `customer:${id}`,
        'id',
        'name',
        'document',
      );
      await CustomerRepositoryRedis.redis.hmset(`customer:${newId}`, {
        id: newId,
        name: newName,
        document: newDocument,
      });
      return {
        id: newId,
        name: newName,
        document: newDocument,
      };
    } catch (e) {
      throw new HttpException('cache indisponivel', HttpStatus.BAD_GATEWAY);
    }
  }

  async checkIfNewIdAlreadyInUse(id: string): Promise<boolean> {
    try {
      const exists = await CustomerRepositoryRedis.redis.hexists(
        `customer:${id}`,
        'name',
      );
      return !!exists;
    } catch (e) {
      throw new HttpException('cache indisponivel', HttpStatus.BAD_GATEWAY);
    }
  }
}
