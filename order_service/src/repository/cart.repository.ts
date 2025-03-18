import { PrismaClient } from "@prisma/client";
import { CartLineItem } from "../dto/cartRequest.dto";
import { ICartRepository } from "../interface/ICartRepository";

export class CartRepository implements ICartRepository {
    private _prisma: PrismaClient;

    constructor() {
        this._prisma = new PrismaClient();
    }

    async createCart(customerId: string, lineItem: CartLineItem): Promise<number> {
        throw new Error("Method not implemented.");
    }

}