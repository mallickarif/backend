const express = require("express");
const router = express.Router();
const product = require("../models/product.model.js");

const productController = require("../controllers/products.js");

router.get("/products", getAllProducts);
router.get("/products/:id", getAllById);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;