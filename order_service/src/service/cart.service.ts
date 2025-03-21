import {
  CartLineItem,
  CartRequestType,
  CartWithLineItems,
} from "../dto/cartRequest.dto";
import { ICartRepository } from "../interface/ICartRepository";
import { logger } from "../utils";
import { GetBookDetails } from "../utils/broker";

export class CartService {
  private _repository: ICartRepository;

  constructor(repository: ICartRepository) {
    this._repository = repository;
  }

  async createCart(customerId: string, lineItem: CartRequestType) {
    const bookDetails = await GetBookDetails(lineItem.itemId);

    logger.info(bookDetails);

    if (bookDetails.data.stock <= lineItem.quantity) {
      throw new Error("Book is out of stock.");
    }

    const totalPrice = bookDetails.data.price * lineItem.quantity;

    return await this._repository.createCart(customerId, {
      itemId: lineItem.itemId,
      itemName: bookDetails.data.title,
      quantity: lineItem.quantity,
      price: totalPrice,
    } as CartLineItem);
  }

  async getCart(customerId: string): Promise<CartWithLineItems> {
    return await this._repository.findCart(customerId);
  }

  async updateCart(lineItem: CartRequestType & { customerId: string }) {
    const cart = await this._repository.findCart(lineItem.customerId);
    const cartItem = cart.lineItems.find((item) => item.id === lineItem.itemId);

    if (!cartItem) {
      throw new Error("Item not found in cart");
    }

    const unitPrice = cartItem.price / cartItem.quantity;
    const totalPrice = unitPrice * lineItem.quantity;
    const priceDifference = totalPrice - cartItem.price;

    return await this._repository.updateCart(
      lineItem.itemId,
      lineItem.quantity,
      totalPrice,
      priceDifference
    );
  }
}
