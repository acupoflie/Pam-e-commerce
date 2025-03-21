import { CartLineItem, CartWithLineItems } from "../dto/cartRequest.dto";

export interface ICartRepository {
  createCart(customerId: string, lineItem: CartLineItem): Promise<string>;
  findCart(customerId: string): Promise<CartWithLineItems>;
}
