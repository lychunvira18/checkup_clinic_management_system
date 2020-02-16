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
    patientMedications: req.body.patientMedications
    // patientNextVisitDate: req.body.patientNextVisitDate
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

// Gets all visits
router.get("/api/visits/", async (req, res) => {
  try {
    const visits = await Visits.find();
    res.json(visits);
  } catch (err) {
    res.json({
      msg: err
    });
  }
});

// Get a specific visit
router.get("/api/visits/:visitId", async (req, res) => {
  try {
    const visit = await Visits.findById(req.params.visitId);
    res.json(visit);
  } catch (err) {
    res.json({
      msg: err
    })
  };
})

// Get visits from a specific visit
router.get("/api/visits/patients/:patientId", async (req,res) => {
  try {
    const visit = await Visits.find({ patientId: req.params.patientId })
    res.json(visit)
  } catch (err) {
    res.json({
      msg: err
    })
  }
})

// Update a specific patient
router.patch("/api/visits/:visitId", async (req, res) => {
  try {
    const updatedVisit = await Visits.findById(req.params.visitId);
    updatedVisit.patientSymptoms = req.body.patientSymptoms
    updatedVisit.patientDiagnosis = req.body.patientDiagnosis
    updatedVisit.patientMedications = req.body.patientMedications
    await updatedVisit.save();
    res.json(updatedVisit);
  } catch (err) {
    res.json({ msg: err });
  }
});

// Delete a specific patient
router.delete("/api/visits/:visitId", async (req, res) => {
  try {
    const removedVisit = await Visits.deleteOne({
      _id: req.params.visitId
    });
    res.json(removedVisit);
  } catch (err) {
    res.json({ msg: err });
  }
});

module.exports = router;
