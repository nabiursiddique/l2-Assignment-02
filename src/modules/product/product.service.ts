import { TProduct } from './product.interface';
import { Product } from './product.model';

type ProductQuery = {
  searchTerm?: string;
};

const createProduct = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProducts = async (query: ProductQuery) => {
  const filter: any = {};
  if (query.searchTerm) {
    const regex = new RegExp(query.searchTerm, 'i');
    filter.$or = [
      { name: { $regex: regex } },
      { description: { $regex: regex } },
      { category: { $regex: regex } },
      { tags: { $regex: regex } },
    ];
  }
  const result = await Product.find(filter);
  return result;
};

const getProductById = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

const updateProductInfo = async (id: string, updateData: object) => {
  const result = await Product.findByIdAndUpdate(id, updateData);
  return result;
};

const deleteAProduct = async (id: string) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

export const productServices = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductInfo,
  deleteAProduct,
};
