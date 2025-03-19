import { CartLineItem } from "../dto/cartRequest.dto";

export interface ICartRepository {
  createCart(customerId: string, lineItem: CartLineItem): Promise<string>;
}
