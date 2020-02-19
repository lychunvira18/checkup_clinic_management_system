const express = require("express");
const router = express.Router();
const Patients = require("../models/patients/Patients");

// Adds a patient
router.post("/api/patients/", async (req, res) => {
  const patient = new Patients({
    patientName: req.body.patientName,
    patientHeight: req.body.patientHeight,
    patientWeight: req.body.patientWeight
  });
  try {
    const savedPatient = await patient.save();
    res.json(savedPatient);
    console.log(savedPatient._id);
  } catch (err) {
    res.json({
      msg: err
    });
  }
});

// Gets all patients
router.get("/api/patients", async (req, res) => {
  try {
    const patients = await Patients.find();
    res.json(patients);
  } catch (err) {
    res.json({
      msg: err
    });
  }
});

// Get a specific patient
router.get("/api/patients/:patientId", async (req, res) => {
  try {
    const patient = await Patients.findById(req.params.patientId);
    res.json(patient);
  } catch (err) {
    res.json({
      msg: err
    });
  }
});

// Update a specific patient
router.patch("/api/patients/:patientId", async (req, res) => {
  try {
    const updatedPatient = await Patients.findById(req.params.patientId);
    updatedPatient.patientName = req.body.patientName;
    updatedPatient.patientHeight = req.body.patientHeight;
    updatedPatient.patientWeight = req.body.patientWeight;
    await updatedPatient.save();
    res.json(updatedPatient);
  } catch (err) {
    res.json({ msg: err });
  }
});

// Delete a specific patient
router.delete("/api/patients/:patientId", async (req, res) => {
  try {
    const removedPatient = await Patients.deleteOne({
      _id: req.params.patientId
    });
    res.json(removedPatient);
  } catch (err) {
    res.json({ msg: err });
  }
});

module.exports = router;
