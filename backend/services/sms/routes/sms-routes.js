// Importing Dependencies
const router = require("express").Router();
const smsController = require("../controllers/smsController");
const requireAccess = require("../middlewares");

// Ping endpoint to check server during development
router.get("/", requireAccess.requireAuth, smsController.pingSmsServer);

// Sms service from "Vonage" (Out of Credit) -- Commented outto avoid clash with mock service
// router.post("/sendSms", requireAccess.requireAuth, smsController.sendSms);

// Mock sms service
router.post("/sendSms", requireAccess.requireAuth, smsController.sendDummySms);

// exporting router
module.exports = router;