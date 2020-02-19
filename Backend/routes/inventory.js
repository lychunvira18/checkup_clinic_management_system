const express = require("express");
const router = express.Router();
const Inventory = require("../models/inventory/Inventory");

// Gets all inventory
router.get("/api/inventory/", async (req, res) => {
    try {
      const inventory = await Inventory.find();
      res.json(inventory);
    } catch (err) {
      res.json({
        msg: err
    });
  }
});

// Adds a product
router.post("/api/inventory/", async (req, res) => {
  const item = new Inventory({
    productName: req.body.productName,
    productCategory: req.body.productCategory,
    productStocks: req.body.productStocks,
    productPrice: req.body.productPrice
  });
  try {
    const savedItem = await item.save();
    res.json(savedItem);
    console.log(savedItem._id);
  } catch (err) {
    res.json({
      msg: err
    });
  }
});

// Add a product amount
router.patch("/api/inventory/add/:itemId", async(req, res) => {
  try {
    const updatedItem = await Inventory.findById(req.params.itemId)
    updatedItem.productStocks += req.body.productStocks
    await updatedItem.save()
    res.json(updatedItem)
  } catch (err) {
    res.json({msg: err})
  }
})

// Edit a product
router.patch("/api/inventory/edit/:itemId", async(req, res) => {
  try {
    const updatedItem = await Inventory.findById(req.params.itemId)
    updatedItem.productName = req.body.productName
    updatedItem.productCategory = req.body.productCategory
    updatedItem.productStocks = req.body.productStocks
    updatedItem.productPrice = req.body.productPrice
    await updatedItem.save()
    res.json(updatedItem)
  } catch (err) {
    res.json({msg: err})
  }
})

// Delete a product
router.delete("/api/inventory/:itemId", async (req, res) => {
  try {
    const removedItem = await Inventory.deleteOne({
      _id: req.params.itemId
    });
    res.json(removedItem);
  } catch (err) {
    res.json({ msg: err });
  }
})


module.exports = router;
