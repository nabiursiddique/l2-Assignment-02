import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (orderData: TOrder) => {
  const result = await Order.create(orderData);
  return result;
};

const getAllOrders = async () => {
  const result = await Order.find();
  return result;
};

export const orderServices = {
  createOrder,
  getAllOrders,
};
