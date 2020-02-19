const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  patientHeight: {
    type: Number,
    required: true
  },
  patientWeight: {
    type: Number,
    required: true
  },
  patientVisits: {
    type: Array,
    default: []
  },
  patientLastVisit: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Patients", PatientSchema);
