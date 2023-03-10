const { signUp, login, verifyToken, getUser} = require("../controllers/user-controllers");

const router = require("express").Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.get("/user",  verifyToken, getUser);

module.exports = router;