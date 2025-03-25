import { CartLineItem, CartWithLineItems } from "../dto/cartRequest.dto";

export interface ICartRepository {
  createCart(customerId: string, lineItem: CartLineItem): Promise<string>;
  findCart(customerId: string): Promise<CartWithLineItems>;
  updateCart(lineItemId: string, qty: number, totalPrice: number, priceDifference: number): Promise<CartLineItem>;
  findCartItem(lineItemId: string): Promise<CartLineItem>;
  deleteCart(customerId: string): Promise<void>;
}
