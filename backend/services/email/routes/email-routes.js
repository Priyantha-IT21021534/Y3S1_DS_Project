const router = require("express").Router();
const emailController= require("../controllers/emailController");


router.get("/",emailController.pingEmailServer);
router.post("/sendMail",emailController.sendMail);


module.exports = router;