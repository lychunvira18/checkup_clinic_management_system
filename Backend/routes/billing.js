const express = require("express");
const router = express.Router();
const Billing = require("../models/billing/Billing");

// Gets all billings
router.get("/api/billing/", async (req, res) => {
    try {
      const billingList = await Billing.find();
      res.json(billingList);
    } catch (err) {
      res.json({
        msg: err
    });
  }
});

// Adds a product
router.post("/api/billing/", async (req, res) => {
    const billing = new Billing({
        billingPatientName: req.body.billingPatientName,
        billingCartItems: req.body.billingCartItems,
        billingDiscountRate: req.body.billingDiscountRate,
        billingGrandTotal: req.body.billingGrandTotal,
        billingDate: req.body.billingDate
    });
    try {
      const savedBilling = await billing.save();
      res.json(savedBilling);
    } catch (err) {
      res.json({
        msg: err
      });
    }
});

// Delete a billing
router.delete("/api/billing/:billingId", async (req, res) => {
    try {
      const removedBilling = await Billing.deleteOne({
        _id: req.params.billingId
      });
      res.json(removedBilling);
    } catch (err) {
      res.json({ msg: err });
    }
  })

module.exports = router;
