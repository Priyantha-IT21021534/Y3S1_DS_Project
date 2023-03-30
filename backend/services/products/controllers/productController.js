const Products = require("../model/products");

//get all products
const getAllProducts = async (req, res, next) => {
  let product;
  try {
    product = await Products.find();
  } catch (err) {
    console.log(err);
  }
  if (!product) {
    return res.status(404).json({ message: "Nothing found" });
  }
  return res.status(200).json(product);
};

//get products by id
const getById = async (req, res, next) => {
  const id = req.params.id;
  let product;
  try {
    product = await Products.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!product) {
    return res.status(404).json({ message: "No product found" });
  }
  return res.status(200).json(product);
};

//add products
const addProduct = async (req, res, next) => {
    const { name, brand, price, weight, upload_date, description, image } =
      req.body;
    let product;
    try {
      product = new Products({
        name, 
        brand, 
        price,
        weight,
        upload_date,
        description,
        image
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

  //update products
const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  const { name, brand, price, weight, upload_date, description, image } = req.body;
  let product;
  try {
    product = await Products.findByIdAndUpdate(id, {
      name, 
      brand, 
      price,
      weight,
      upload_date,
      description,
      image
    });
    product = await product.save();
  } catch (err) {
    console.log(err);
  }
  if (!product) {
    return res.status(404).json({ message: "Unable to Update by id" });
  }
  return res.status(200).json({ product });
};

//delete products
const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  let product;
  try {
    product = await Products.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!product) {
    return res.status(404).json({ message: "Unable to Delete by id" });
  }
  return res.status(200).json({ message: "Product Successfully Deleted" });
};


  exports.addProduct = addProduct;
  exports.getAllProducts = getAllProducts;
  exports.getById = getById;
  exports.updateProduct = updateProduct;
  exports.deleteProduct = deleteProduct;


  