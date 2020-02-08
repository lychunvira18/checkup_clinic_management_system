const express = require("express");
const router = express.Router();
const Visits = require("../models/visits/Visits");

// Adds a patient
router.post("/api/visits/", async (req, res) => {
  const visit = new Visits({
    patientId: req.body.patientId,
    patientName: req.body.patientName,
    patientSymptoms: req.body.patientSymptoms,
    patientDiagnosis: req.body.patientDiagnosis,
    patientVisitDate: req.body.patientVisitDate,
    patientMedications: req.body.patietnMedications,
    patientNextVisitDate: req.body.patientNextVisitDate
  });
  try {
    const savedVisit = await visit.save();
    res.json(savedVisit);
    console.log(savedVisit._id);
  } catch (err) {
    res.json({
      msg: err
    });
  }
});

module.exports = router;
