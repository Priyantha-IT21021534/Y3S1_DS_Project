const express = require("express");
const router = express.Router();
const products = require("../model/products");
const productController= require("../controllers/productController");
const requireAccess  = require("../../authenticate/controllers/user-controller")
//const {onlySeller} = require("../../authenticate/middleware")
router.use(requireAccess.requireAuth)

//router.post("/addProduct", requireAccess.requireAuth, requireAccess.ensureAdmin, productController.addProduct);
router.post("/addProduct", productController.addProduct);
router.get("/getProducts", productController.getAllProducts);
router.get("/getId/:id",productController.getById);
router.put("/updateProduct/:id",productController.updateProduct);
router.delete("/deleteProduct/:id",productController.deleteProduct);

module.exports = router;