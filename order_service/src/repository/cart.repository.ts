import { PrismaClient } from "@prisma/client";
import { CartLineItem, CartWithLineItems } from "../dto/cartRequest.dto";
import { ICartRepository } from "../interface/ICartRepository";

export class CartRepository implements ICartRepository {
  private _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async createCart(
    customerId: string,
    lineItem: CartLineItem
  ): Promise<string> {
    const cart = await this._prisma.cart.upsert({
      where: { userId: customerId },
      create: {
        userId: customerId,
        totalPrice: lineItem.price,
      },
      update: {
        totalPrice: { increment: lineItem.price },
        updatedAt: new Date(Date.now()),
      },
    });

    const { id } = cart;

    if (id) {
      await this._prisma.cartItem.create({
        data: {
          cartId: id,
          itemId: lineItem.itemId,
          itemName: lineItem.itemName,
          quantity: lineItem.quantity,
          price: lineItem.price,
        },
      });
    }

    return id;
  }

  async findCart(customerId: string): Promise<CartWithLineItems> {
    const cart = await this._prisma.cart.findFirst({
      where: { userId: customerId },
      include: {
        items: true,
      },
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    return {
      id: cart.id,
      userId: cart.userId,
      totalPrice: Number(cart.totalPrice),
      lineItems: cart.items as unknown as CartLineItem[]
    }
  }
}
