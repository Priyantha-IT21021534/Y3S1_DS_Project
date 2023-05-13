// Import dependencies
const router = require("express").Router();
const emailController= require("../controllers/emailController");
const auth = require("../middlewares");

// Ping server endpoint
router.get("/", emailController.pingEmailServer);

// Send Email endpoint (using gmail services)
router.post("/sendMail", auth.requireAuth, emailController.sendMail);

// Exporting router
module.exports = router;