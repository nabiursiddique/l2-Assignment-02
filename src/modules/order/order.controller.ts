import { Request, Response } from 'express';
import { orderServices } from './order.service';
import { orderSchemaValidator } from './order.validation.zod';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    // schema validation using zod
    const validatedOrderData = orderSchemaValidator.parse(orderData);
    const result = await orderServices.createOrder(validatedOrderData);
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
