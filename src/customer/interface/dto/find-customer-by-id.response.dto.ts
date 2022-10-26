import { FindCustomerByIdResult } from '../../application/query/find-customer-by-id.result';

export class FindCustomerByIdResponseDTO extends FindCustomerByIdResult {
  readonly id: string;
  readonly name: string;
  readonly document: string;
}
