import { PrismaClient } from "@prisma/client";
import { IOrderRepository } from "../interface/IOrderRepository";
import { OrderWithLineItems } from "../dto/orderRequest.dto";

export class OrderRepository implements IOrderRepository {
  private _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async createOrder(order: OrderWithLineItems): Promise<String> {
    const createdOrder = await this._prisma.order.create({
      data: {
        customerId: order.customerId,
        orderNumber: order.orderNumber,
        totalPrice: order.totalPrice,
        status: order.status,
      },
    });

    const { id } = createdOrder;

    if (id) {
      const orderLineItems = order.items.map((item) => {
        return {
          orderId: id,
          itemId: item.itemId,
          itemName: item.itemName,
          quantity: item.quantity,
          price: item.price,
        };
      });

      await this._prisma.orderItem.createMany({
        data: orderLineItems,
      });
    }

    return id;
  }
}
