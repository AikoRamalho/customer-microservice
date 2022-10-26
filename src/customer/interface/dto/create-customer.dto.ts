import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class CreateCustomerDTO {
  @IsString()
  name: string;

  @Type(() => Number)
  @IsInt()
  document: number;
}
