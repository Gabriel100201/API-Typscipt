import { Router } from 'express';
import { addProduct, getAllProducts } from '../controllers/product.controller';

const router = Router();

router.get('/', getAllProducts);
router.post('/', addProduct);

export default router;