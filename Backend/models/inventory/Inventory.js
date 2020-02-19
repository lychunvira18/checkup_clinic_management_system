const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  productCategory: {
    type: String,
    required: true
  },
  productStocks: {
    type: Number,
    required: true
  },
  productPrice: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Inventories", ItemSchema);
