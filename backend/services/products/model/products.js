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
  },
  weight: {
    type: Number,
    require: true
  },
  upload_date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model("Products", productSchema);
