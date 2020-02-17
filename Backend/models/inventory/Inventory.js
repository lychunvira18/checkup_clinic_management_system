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
  productBatch: {
      type: Array
  },
  productStocks: {
      type: Number
  }
});

module.exports = mongoose.model("Inventory", ItemSchema);
