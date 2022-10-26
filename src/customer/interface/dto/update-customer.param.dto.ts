import { IsUUID } from 'class-validator';

export class UpdateCustomerParamDTO {
  @IsUUID()
  id: string;
}
