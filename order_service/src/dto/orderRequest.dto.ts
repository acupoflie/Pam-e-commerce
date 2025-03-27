export type OrderLineItemType = {
  id: string;
  orderId : string;
  itemId: string;
  itemName: string;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

export interface OrderWithLineItems {
  id?: string;
  customerId: string;
  orderNumber: number;
  totalPrice: number;
  status: string;
  items: OrderLineItemType[];
  createdAt?: Date;
  updatedAt?: Date;
}
