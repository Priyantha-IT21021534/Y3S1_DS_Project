const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
     required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    require: true
  }
 /* bikeId: {
    type: String,
    // require: true
  },
  date: {
    type: String,
    // required: true
  },
  start: {
    type: String,
    // required: true
  },
  end: {
    type: String,
    //    required: true
  },
  description: {
    type: String,
    // required: true
  },*/
});

module.exports = mongoose.model("Products", productSchema);
