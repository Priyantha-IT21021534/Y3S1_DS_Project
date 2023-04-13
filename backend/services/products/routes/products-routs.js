const express = require("express");
const router = express.Router();
const productController= require("../controllers/productController");
const requireAccess  = require("../../authenticate/middlewares")

router.use(requireAccess.requireAuth)

router.post("/addProduct", requireAccess.requireAuth, requireAccess.requireRoleSeller, productController.addProduct);
router.get("/getProducts", requireAccess.requireAuth, requireAccess.requireRoleBuyer, productController.getAllProducts);
//router.get("/getId/:id",productController.getById);
router.put("/updateProduct/:id",requireAccess.requireAuth, requireAccess.requireRoleSeller, productController.updateProduct);
//router.delete("/deleteProduct/:id",productController.deleteProduct);
router.get("/search/", requireAccess.requireAuth, requireAccess.requireRoleBuyer, productController.getSearch)

module.exports = router;