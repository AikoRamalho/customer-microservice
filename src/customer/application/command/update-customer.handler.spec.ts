import {
  ConflictException,
  HttpStatus,
  ModuleMetadata,
  Provider,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Test } from '@nestjs/testing';
import { CustomerRepository } from 'src/customer/domain/customer.interface';
import { InjectionToken } from '../injection.token';
import { UpdateCustomerCommand } from './update-customer.command';
import { UpdateCustomerHandler } from './update-customer.handler';

describe('UpdatePasswordHandler', () => {
  let handler: UpdateCustomerHandler;
  let repository: CustomerRepository;

  beforeEach(async () => {
    const repositoryProvider: Provider = {
      provide: InjectionToken.CUSTOMER_REPOSITORY,
      useValue: {},
    };
    const providers: Provider[] = [UpdateCustomerHandler, repositoryProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(UpdateCustomerHandler);
    repository = testModule.get(InjectionToken.CUSTOMER_REPOSITORY);
  });

  describe('execute', () => {
    it('should return 409 when new id already in use', async () => {
      const command = new UpdateCustomerCommand(
        '6b157ad8-989f-4422-8701-6a0813f766a2',
        '6b157ad8-989f-4422-8701-6a0813f766a3',
        'new name',
        123456789,
      );

      repository.checkIfNewIdAlreadyInUse = jest.fn().mockReturnValueOnce(true);

      expect(handler.execute(command)).rejects.toThrow(
        new HttpException('conflito de ID', HttpStatus.CONFLICT),
      );
    });
    it('should return 404 when customerNotFound', async () => {
      const command = new UpdateCustomerCommand(
        '6b157ad8-989f-4422-8701-6a0813f766a2',
        '6b157ad8-989f-4422-8701-6a0813f766a3',
        'new name',
        123456789,
      );
      repository.checkIfNewIdAlreadyInUse = jest
        .fn()
        .mockReturnValueOnce(false);

      repository.findById = jest.fn().mockReturnValueOnce({});

      expect(handler.execute(command)).rejects.toThrow(
        new HttpException('cliente inexistente', HttpStatus.NOT_FOUND),
      );
    });
  });
});
