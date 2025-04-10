import express from 'express'
import { createProducts, deleteProduct, getAllProducts, getProduct, updateProduct } from '../controller/productController.js';

const router = express();

router.get("/", getAllProducts)
router.get("/:id", getProduct)
router.post("/", createProducts)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)






export default router