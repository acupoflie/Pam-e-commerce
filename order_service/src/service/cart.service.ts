import { CartLineItem, CartRequestType } from "../dto/cartRequest.dto";
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
}
