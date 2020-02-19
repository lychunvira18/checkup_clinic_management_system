const mongoose = require("mongoose");

const BillingSchema = mongoose.Schema({
    billingPatientName: {
        type: String,
        required: true
    },
    billingCartItems: {
        type: Array,
        required: true
    },
    billingDiscountRate: {
        type: Number,
        required: true
    },
    billingGrandTotal: {
        type: Number,
        required: true
    },
    billingDate: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Billings", BillingSchema);
