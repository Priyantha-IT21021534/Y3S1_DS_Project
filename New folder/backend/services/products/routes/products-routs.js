const express = require("express");
const router = express.Router();
const products = require("../model/products");
const productController= require("../controllers/productController");



router.post("/addProduct",productController.addProduct);
router.get("/getProducts",productController.getAllProducts);
router.get("/getId/:id",productController.getById);
router.put("/updateProduct/:id",productController.updateProduct);
router.delete("/deleteProduct/:id",productController.deleteProduct);

module.exports = router;