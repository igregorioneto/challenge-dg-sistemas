import { Router } from "express";
import ProductController from "../controllers/ProductController";
const router = Router();

const corsOptions = {
  origin: '*',
  credentrials: true,
  optionSuccessStatus: 200,
}

router.get('/product', ProductController.getAllProducts);
router.get('/product/:id', ProductController.getByIdProduct);
router.post('/product', ProductController.createProduct);
router.put('/product/:id', ProductController.updateProduct);
router.delete('/product/:id', ProductController.deleteProduct);

export default router;