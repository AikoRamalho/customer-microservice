import { Module } from '@nestjs/common';
import { CustomersController } from './interface/customers.controller';

@Module({
  imports: [],
  controllers: [CustomersController],
  providers: [],
})
export class CustomersModule {}
