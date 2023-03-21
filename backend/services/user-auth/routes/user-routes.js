const { signUp,login,verifyToken, getUser, getUsers, grantAccess, allowIfLoggedin, updateUser, deleteUser } = require("../controllers/user-controllers");

//const productController = require("../../products/controllers/productController");
//const  products = ("../../products/model/products");


const router = require("express").Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.get("/users", verifyToken,allowIfLoggedin, grantAccess('readAny', 'profile'), getUsers);
router.put('/user/:id', verifyToken, allowIfLoggedin, grantAccess('updateAny', 'profile'), updateUser); 
router.put('/Ownuser/:id', verifyToken, allowIfLoggedin, grantAccess('updateOwn', 'profile'), updateUser); 
router.delete('/user/:id', verifyToken, allowIfLoggedin, grantAccess('deleteAny', 'profile'), deleteUser);
router.delete('/ownUser/:id', verifyToken, allowIfLoggedin, grantAccess('deleteOwn', 'profile'), deleteUser);

//router.post("/addProduct",verifyToken, allowIfLoggedin, grantAccess('createAny', 'product'), productController.addProduct);

module.exports = router;