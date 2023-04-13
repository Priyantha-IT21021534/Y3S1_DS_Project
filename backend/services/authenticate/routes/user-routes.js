const { signUp, login, getUsers } = require("../controllers/user-controller");

const {requireAuth, requireRoleAdmin} = require("../middlewares")

const router = require("express").Router();

router.post("/signUp", signUp);
router.post("/login", login);

router.get("/users", requireAuth, requireRoleAdmin, getUsers);


module.exports = router;