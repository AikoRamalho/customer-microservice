import {
  HttpException,
  HttpStatus,
  ModuleMetadata,
  Provider,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { InjectionToken } from '../injection.token';
import { CustomerQuery } from './customer.query';
import { FindCustomerById } from './find-customer-by-id.handler';
import { FindCustomerByIdQuery } from './find-customer-by-id.query';

describe('FindAccountByIdHandler', () => {
  let customerQuery: CustomerQuery;
  let handler: FindCustomerById;

  beforeEach(async () => {
    const queryProvider: Provider = {
      provide: InjectionToken.CUSTOMER_QUERY,
      useValue: {},
    };
    const providers: Provider[] = [queryProvider, FindCustomerById];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();
    customerQuery = testModule.get(InjectionToken.CUSTOMER_QUERY);
    handler = testModule.get(FindCustomerById);
  });

  describe('execute', () => {
    it('should throws 404 customer not found', async () => {
      const command = new FindCustomerByIdQuery(
        '6b157ad8-989f-4422-8701-6a0813f766a2',
      );

      customerQuery.findById = jest
        .fn()
        .mockReturnValueOnce(new Promise((resolve) => resolve({})));

      await expect(handler.execute(command)).rejects.toThrow(
        new HttpException('cliente inexistente', HttpStatus.NOT_FOUND),
      );
    });
  });
});
