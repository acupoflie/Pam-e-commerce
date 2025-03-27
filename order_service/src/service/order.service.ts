import { OrderWithLineItems } from "../dto/orderRequest.dto";
import { OrderLineItemType } from "../dto/orderRequest.dto";
import { ICartRepository } from "../interface/ICartRepository";
import { IOrderRepository } from "../interface/IOrderRepository";
import { CartRepository } from "../repository/cart.repository";
import { OrderRepository } from "../repository/order.repository";
import { OrderStatus } from "../types/orderStatus.type";

export class OrderService {
  private _orderRepository: IOrderRepository;
  private _cartRepository: ICartRepository;

  constructor() {
    this._orderRepository = new OrderRepository();
    this._cartRepository = new CartRepository();
  }

  async createOrder(
    userId: string
  ) {
    const cart = await this._cartRepository.findCart(userId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    let orderLineItems: OrderLineItemType[] = [];
    let totalPrice = 0;

    cart.lineItems.forEach((lineItem) => {
      totalPrice += lineItem.price;
      orderLineItems.push({
        itemId: lineItem.itemId,
        itemName: lineItem.itemName,
        quantity: lineItem.quantity,
        price: lineItem.price,
      } as OrderLineItemType);
    });

    const orderNumber = Math.floor(Math.random() * 1000000);

    const orderInput: OrderWithLineItems = {
      customerId: userId,
      orderNumber: orderNumber,
      totalPrice: totalPrice,
      status: OrderStatus.PENDING,
      items: orderLineItems,
    };

    const order = await this._orderRepository.createOrder(orderInput);

    // await cartRepository.deleteCart(userId);

    return order;
  }
}
