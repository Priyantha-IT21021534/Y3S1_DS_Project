const { signUp, login, getUsers, getUser, logout, updatePassword } = require("../controllers/user-controller");

const {requireAuth, requireRoleAdmin} = require("../middlewares")

const router = require("express").Router();

router.post("/signUp", signUp);
router.post("/login", login);

router.get("/users", requireAuth, requireRoleAdmin, getUsers);
router.get("/profile", requireAuth, getUser);
router.post("/logout", requireAuth, logout);
//router.put("/update/:userId", requireAuth, updatePassword)


module.exports = router;