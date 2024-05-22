import { Request, Response } from 'express';
import { orderServices } from './order.service';
import { orderSchemaValidator } from './order.validation.zod';
import { productServices } from '../product/product.service';
import { TProduct } from '../product/product.interface';

//* Creating orders in db
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const { productId, quantity } = orderData;

    // finding the product that we are ordering in products
    const targetProduct = await productServices.getProductById(productId);
    if (!targetProduct) {
      res.status(500).json({
        success: false,
        message: `Product with id ${productId} not found`,
      });
    }
    const { inventory } = targetProduct as TProduct;
    const { quantity: productQuantity } = inventory;
    if (productQuantity < quantity) {
      res.status(500).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
    }
    try {
      // creating order
      const validatedOrderData = orderSchemaValidator.parse(orderData);
      const result = await orderServices.createOrder(validatedOrderData);

      //   after creating order updating the product quantity
      await productServices.updateProductInfo(productId, {
        inventory: {
          quantity: productQuantity - quantity,
          inStock: productQuantity - quantity ? true : false,
        },
      });

      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: result,
      });
    } catch (err) {
      // if any error while creating the order
      res.status(500).json({
        success: false,
        message: err,
      });
    }
  } catch (err) {
    // if any error while finding the product
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
