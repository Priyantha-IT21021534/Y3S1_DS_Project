const router = require("express").Router();
const paymentController= require("../controllers/paymentController");


router.get("/", paymentController.pingPaymentServer);
router.post("/card", paymentController.dummyCardPayment);


module.exports = router;