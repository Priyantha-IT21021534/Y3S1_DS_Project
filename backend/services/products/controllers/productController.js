const Products = require("../model/products");


const addProduct = async (req, res, next) => {
    const { name, brand, price } =
      req.body;
    let product;
    try {
      product = new Products({
        name, 
        brand, 
        price
      });
      await product.save();
    } catch (err) {
      console.log(err);
    }
    if (!product) {
      return res.status(500).json({ message: "Unable to add" });
    }
    return res.status(201).json(product);
  };
  exports.addProduct = addProduct;