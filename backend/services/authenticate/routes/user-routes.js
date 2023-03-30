const { signUp, login } = require("../controllers/user-controller");

const router = require("express").Router();

router.post("/signUp", signUp);
router.post("/login", login);

module.exports = router;