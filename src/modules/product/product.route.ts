import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:productId', ProductController.getProductById);
router.put('/:productId', ProductController.updateProductInfo);

export const ProductRoutes = router;
