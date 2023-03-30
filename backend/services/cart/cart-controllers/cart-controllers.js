const Cart = require("../model/cart");

//add Cart
const addCart = async (req, res, next) => {
    
    let cart;
    try {
        cart = new Cart({
            user: req.user._id,
            cartItems : req.body.cartItems
      });
      await cart.save();
    } catch (err) {
      console.log(err);
    }
    if (!cart) {
      return res.status(500).json({ message: "Unable to add" });
    }
    return res.status(201).json(cart);
  };




  exports.addCart = addCart;