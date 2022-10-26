import { Type } from 'class-transformer';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class UpdateCustomerBodyDTO {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @Type(() => Number)
  @IsNumber()
  document: number;
}
