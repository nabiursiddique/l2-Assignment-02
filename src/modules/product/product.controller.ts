import { Request, Response } from 'express';
import { productServices } from './product.service';

//* Creating a product in DB
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const result = await productServices.createProduct(productData);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong!',
    });
  }
};

//* Getting all the products from DB
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllProducts();
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong!',
    });
  }
};

//* Getting a specific product from DB by it's id
const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getProductById(productId);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `some thing went wrong || ${err}`,
    });
  }
};

//* Updating a specific product information
const updateProductInfo = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    const updatedProduct = await productServices.updateProductInfo(
      productId,
      updateData,
    );
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: updateData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'We could not update the product',
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductInfo,
};
