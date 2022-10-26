import { IsUUID } from 'class-validator';

export class FindCustomerByIdParamDto {
  @IsUUID()
  id: string;
}
