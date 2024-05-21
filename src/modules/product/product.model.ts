import mongoose, { Schema } from 'mongoose';
import { TInventory, TProduct, TVariants } from './product.interface';

const variantsSchema = new Schema<TVariants>(
  {
    type: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false },
);

const inventorySchema = new Schema<TInventory>(
  {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { _id: false },
);

const movieSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [{ type: String, required: true }],
  variants: [variantsSchema],
  inventory: inventorySchema,
});

export const Product = mongoose.model<TProduct>('Product', movieSchema);
