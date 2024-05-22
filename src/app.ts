import express, { Request, Response } from 'express';
export const app = express();
import cors from 'cors';
import { ProductRoutes } from './modules/product/product.route';
import { OrderRoutes } from './modules/order/order.route';

app.use(express.json());
app.use(cors());

app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
