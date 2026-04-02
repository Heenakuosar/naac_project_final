const express = require("express");
const router = express.Router();
const {
  addNAACData,
  submitFacultyForm,
  getFacultyFormsData,
  generateIndividualFormReport,
  generateConsolidatedReport,
} = require("../controller/criterion3.controller");
const upload = require("../middleware/multer.middleware");
const Criterion3 = require("../models/Criterion3.model");
const { verifyToken } = require("../middleware/auth.middleware");

router.post("/add", verifyToken, upload.single("document"), addNAACData);
router.post("/forms/:formType", verifyToken, upload.single("document"), submitFacultyForm);
router.get("/forms", verifyToken, getFacultyFormsData);
router.get("/reports/individual", verifyToken, generateIndividualFormReport);
router.get("/reports/consolidated", verifyToken, generateConsolidatedReport);

// GET endpoint to fetch all Criterion3 data
router.get("/", async (req, res) => {
  try {
    const data = await Criterion3.find(); // MongoDB se saara data fetch karein
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

module.exports = router;