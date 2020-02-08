const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  patientHeight: {
    type: String,
    required: true
  },
  patientWeight: {
    type: String,
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
