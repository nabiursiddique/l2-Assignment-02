import { Request, Response } from 'express';
import { productServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  const productData = req.body;
  const result = await productServices.createProduct(productData);
  res.status(200).json({
    success: true,
    message: 'Product created successfully!',
    data: result,
  });
};

const getAllProducts = async (req: Request, res: Response) => {
  const result = await productServices.getAllProducts();
  res.status(200).json({
    success: true,
    message: 'Products fetched successfully!',
    data: result,
  });
};

export const ProductController = {
  createProduct,
  getAllProducts,
};
