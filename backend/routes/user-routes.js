const express = require("express")

const { signUp, login, verifyToken, getUser, refreshToken, logout} = require("../controllers/user-controllers");

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.get("/user",  verifyToken, getUser);
router.get("/refresh", refreshToken, verifyToken ,getUser)
router.post("/logout", verifyToken, logout);

module.exports = router;