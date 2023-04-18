const { signUp, login, getUsers, getUser } = require("../controllers/user-controller");

const {requireAuth, requireRoleAdmin} = require("../middlewares")

const router = require("express").Router();

router.post("/signUp", signUp);
router.post("/login", login);

router.get("/users", requireAuth, requireRoleAdmin, getUsers);
router.get("/profile", requireAuth, getUser)


module.exports = router;