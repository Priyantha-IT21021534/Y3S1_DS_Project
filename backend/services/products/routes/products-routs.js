const express = require("express");
const router = express.Router();
const productController= require("../controllers/productController");
const requireAccess  = require("../../shared/middlewares")

router.use(requireAccess.requireAuth)

router.post("/addProduct", requireAccess.requireAuth, requireAccess.requireRoleSeller, productController.addProduct);
router.get("/getProducts", requireAccess.requireAuth, requireAccess.requireRoleBuyer, productController.getAllProducts);
//router.get("/getId/:id",productController.getById);
//router.put("/updateProduct/:id",productController.updateProduct);
//router.delete("/deleteProduct/:id",productController.deleteProduct);

module.exports = router;