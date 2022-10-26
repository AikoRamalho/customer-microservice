import { ModuleMetadata, Provider } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CustomerRepository } from '../../../domain/customer.interface';
import { CustomerFactory } from '../../../domain/factory';
import { CreateCustomerCommand } from './create-customer.command';
import { CreateCustomerHandler } from './create-customer.handler';

describe('CreateCustomerHandler', () => {
  let handler: CreateCustomerHandler;
  let repository: CustomerRepository;
  let factory: CustomerFactory;
  let eventPublisher: EventPublisher;

  beforeEach(async () => {
    const repoProvider: Provider = {
      provide: 'CustomerRepository',
      useValue: {},
    };
    const factoryProvider: Provider = {
      provide: CustomerFactory,
      useValue: {},
    };
    const eventPublishProvider: Provider = {
      provide: EventPublisher,
      useValue: {},
    };
    const providers: Provider[] = [
      CreateCustomerHandler,
      repoProvider,
      factoryProvider,
      eventPublishProvider,
    ];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get(CreateCustomerHandler);
    repository = testModule.get('CustomerRepository');
    factory = testModule.get(CustomerFactory);
    eventPublisher = testModule.get(EventPublisher);
  });

  describe('execute', () => {
    it('should execute CreateCustomer Handler', async () => {
      const aggregateCustomer = { applyCustomerCreatedEvent: jest.fn() };
      const customer = { commit: jest.fn(), getProperty: jest.fn() };

      factory.create = jest.fn().mockReturnValue(aggregateCustomer);
      repository.create = jest.fn().mockResolvedValue(undefined);
      eventPublisher.mergeObjectContext = jest.fn().mockReturnValue(customer);

      const command = new CreateCustomerCommand('name', 2);

      await expect(handler.execute(command)).resolves.toEqual(undefined);
      expect(factory.create).toBeCalledTimes(1);
      expect(repository.create).toBeCalledTimes(1);
      expect(repository.create).toBeCalledWith(customer);
    });
  });
});
