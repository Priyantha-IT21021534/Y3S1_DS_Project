const router = require("express").Router();
const deliveryController= require("../middlewares");


router.get("/", deliveryController.pingDeliveryServer);
router.post("/rate", deliveryController.getRate);
// router.post("/sendMail",emailController.sendMail);


module.exports = router;