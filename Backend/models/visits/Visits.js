const mongoose = require("mongoose");

const VisitSchema = mongoose.Schema({
  patientId: {
    type: String,
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  patientSymptoms: {
    type: Array(String),
    required: true
  },
  patientDiagnosis: {
    type: String,
    required: true
  },
  patientVisitDate: {
    type: Date,
    default: Date.now
  },
  patientMedications: {
    type: Array,
    default: []
  }
  // patientNextVisitDate: {
  //   type: Date
  // }
});

module.exports = mongoose.model("Visits", VisitSchema);
