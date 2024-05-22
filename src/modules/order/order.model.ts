import mongoose, { Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    email: { type: String, required: true },
    productId: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { versionKey: false },
);

export const Order = mongoose.model<TOrder>('Order', orderSchema);
