import { Module } from '@nestjs/common';
import { CustomersModule } from './customer/customers.module';

@Module({
  imports: [CustomersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
