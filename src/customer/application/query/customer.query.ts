export class Customer {
  id: string;
  name: string;
  document: string;
}

export interface CustomerQuery {
  findById(id: string): Promise<any>;
}
