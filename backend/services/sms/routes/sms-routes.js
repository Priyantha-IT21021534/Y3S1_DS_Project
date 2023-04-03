const router = require("express").Router();
const smsController= require("../controllers/smsController");


router.get("/",smsController.pingSmsServer);
// router.post("/sendSms",smsController.sendSms);
router.post("/sendSms",smsController.sendDummySms);


module.exports = router;