import { CartLineItem } from "../dto/cartRequest.dto";
import { ICartRepository } from "../interface/ICartRepository";

export class CartService {
  private _repository: ICartRepository;

  constructor(repository: ICartRepository) {
    this._repository = repository;
  }

  async createCart(customerId: string, lineItem: CartLineItem) {
    return await this._repository.createCart(customerId, lineItem);
  }
}
