import { Request, Response } from 'express';
import { orderServices } from './order.service';
import { orderSchemaValidator } from './order.validation.zod';

//* Creating orders in db
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

//* Getting all orders from db
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const result = await orderServices.getAllOrders(query);

    if (Object.keys(query).length === 0) {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    } else if (Object.keys(query)[0] === 'email') {
      if (result.length > 0) {
        res.status(200).json({
          success: true,
          message: 'Orders fetched successfully for user email!',
          data: result,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Order not found',
        });
      }
    } else {
      res.status(500).json({
        success: false,
        message: 'Route not found',
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
