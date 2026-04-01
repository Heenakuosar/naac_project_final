const express = require("express");
const router = express.Router();
const { addNAACData } = require("../controller/criterion3.controller"); // Path check karein
const upload = require("../middleware/multer.middleware"); // Multer check karein
const Criterion3 = require("../models/Criterion3.model");

// YE LINE SABSE IMPORTANT HAI:
router.post("/add", upload.single('document'), addNAACData); 

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