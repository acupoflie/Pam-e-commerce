import { OrderWithLineItems } from "../dto/orderRequest.dto";

export interface IOrderRepository {
  createOrder(order: OrderWithLineItems): Promise<String>;
}
