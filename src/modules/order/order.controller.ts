import { Request, Response } from 'express';
import { orderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result = await orderServices.createOrder(orderData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

export const OrderController = {
  createOrder,
};
