import { TOrder } from './order.interface';
import { Order } from './order.model';

type OrderQuery = {
  email?: string;
};

const createOrder = async (orderData: TOrder) => {
  const result = await Order.create(orderData);
  return result;
};

const getAllOrders = async (query: OrderQuery) => {
  const filter: Partial<TOrder> = {};
  if (query.email) {
    return await Order.find(query);
  }
  const result = await Order.find(filter);
  return result;
};

export const orderServices = {
  createOrder,
  getAllOrders,
};
