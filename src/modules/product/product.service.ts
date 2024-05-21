import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProduct = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProducts = async () => {
  const result = await Product.find();
  return result;
};

const getProductById = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

export const productServices = {
  createProduct,
  getAllProducts,
  getProductById,
};
