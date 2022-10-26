import { IsUUID } from 'class-validator';

export class UpdateCustomerParam {
  @IsUUID()
  id: string;
}
