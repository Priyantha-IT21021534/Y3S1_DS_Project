const { signUp, login, getUsers, getUser, logout } = require("../controllers/user-controller");

const {requireAuth, requireRoleAdmin} = require("../middlewares")

const router = require("express").Router();

router.post("/signUp", signUp);
router.post("/login", login);

router.get("/users", requireAuth, requireRoleAdmin, getUsers);
router.get("/profile", requireAuth, getUser)
router.post("/logout", requireAuth, logout);


module.exports = router;