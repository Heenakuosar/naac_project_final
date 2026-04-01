const Criterion3 = require("../models/Criterion3.model");

exports.addNAACData = async (req, res) => {
    try {
        // 1. Pehle dekhte hain frontend se kya aaya
        console.log("Frontend se aaya data:", req.body);
        console.log("File aayi ya nahi:", req.file);

        const { teacherName, amountProvided, year, duration, category } = req.body;

        const newData = new Criterion3({
            teacherName,
            amountProvided, // Spelling check karein Schema ke hisaab se
            year,
            duration,
            category,
            documentLink: req.file ? req.file.path : "" 
        });

        await newData.save();
        res.status(200).json({ success: true, message: "Data Saved!" });
    } catch (error) {
    // Ye 3 lines aapke terminal mein sach ugal dengi
    console.log("!!!!!!!! ASLI ERROR YAHAN HAI !!!!!!!! ");
    console.log("Error Name:", error.name);
    console.log("Error Message:", error.message);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ");

    res.status(500).json({ 
        success: false, 
        error: error.message // Ye message aapke browser ke alert mein dikhega
    });
    }
};