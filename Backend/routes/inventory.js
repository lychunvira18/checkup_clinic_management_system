const express = require("express");
const router = express.Router();
const Inventory = require("../models/inventory/Inventory");

// Adds a patient
router.post("/api/inventory/", async (req, res) => {
  const item = new Inventory({
    
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


module.exports = router;
