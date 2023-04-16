const { Order } = require("../models/Order");
const { auth } = require("../middleware/auth");

const router = require("express").Router();

//CREATE

// createOrder is fired by stripe webhook
// example endpoint
router.post("/", auth, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).send(savedOrder);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
