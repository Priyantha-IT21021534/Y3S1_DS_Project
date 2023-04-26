const { signUp, login, getUsers, getUser, logout, updatePassword, deleteUser, updateProfile } = require("../controllers/user-controller");

const {requireAuth, requireRoleAdmin} = require("../middlewares")

const router = require("express").Router();

router.post("/signUp", signUp);
router.post("/login", login);

router.get("/users", requireAuth, requireRoleAdmin, getUsers);
router.get("/profile", requireAuth, getUser);
router.post("/logout", requireAuth, logout);
router.delete("/deleteUser", requireAuth, deleteUser)
router.patch("/update", requireAuth, updateProfile)
router.patch("/update/pwd", requireAuth, updatePassword)


module.exports = router;