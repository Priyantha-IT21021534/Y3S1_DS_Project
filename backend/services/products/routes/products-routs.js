const express = require("express");
const router = express.Router();
const products = require("../model/products");
const productController= require("../controllers/productController");
 
const requireAccess  = require("../../authenticate/middleware")
//const {onlySeller} = require("../../authenticate/middleware")
router.use(requireAccess.requireAuth)

router.post("/addProduct", requireAccess.requireAuth, requireAccess.onlySeller, productController.addProduct);
//router.get("/getProducts", verifyToken, allowIfLoggedin, grantAccess('readAny', 'product'), productController.getAllProducts);
//router.get("/getId/:id",productController.getById);
//router.put("/updateProduct/:id",productController.updateProduct);
//router.delete("/deleteProduct/:id",productController.deleteProduct);

module.exports = router;