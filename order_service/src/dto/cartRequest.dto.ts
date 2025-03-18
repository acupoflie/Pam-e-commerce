import { Type, Static } from "@sinclair/typebox";

export const CartRequestSchema = Type.Object({
    itemId: Type.String(),
    quantity: Type.Number()
})

export type CartRequestType = Static<typeof CartRequestSchema>;

export interface CartLineItem {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
