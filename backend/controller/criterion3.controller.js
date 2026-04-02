const Criterion3 = require("../models/Criterion3.model");
const PDFDocument = require("pdfkit");

const ALLOWED_FORM_TYPES = [
    "seed-money",
    "awards",
    "innovations",
    "patents-published",
    "phds-awarded",
    "research-papers",
    "books",
];

const FORM_TITLES = {
    "seed-money": "Seed Money",
    "awards": "Awards",
    "innovations": "Innovations",
    "patents-published": "Patents Published",
    "phds-awarded": "PhDs Awarded",
    "research-papers": "Research Papers",
    "books": "Books",
};

function getLoggedInFaculty(req) {
    const user = req.user || {};
    return {
        id: user._id || user.id,
        name: user.username || "Unknown Faculty",
        email: user.email || "",
    };
}

function normalizePayload(payload = {}) {
    const normalized = {};
    Object.keys(payload).forEach((key) => {
        if (["document", "formType", "category"].includes(key)) return;
        const value = payload[key];
        if (value === undefined || value === null || value === "") return;
        normalized[key] = value;
    });
    return normalized;
}

function writeActivityBlock(doc, title, activity, startY) {
    let currentY = startY;

    doc.font("Helvetica-Bold").fontSize(12).text(title, 50, currentY);
    currentY += 18;

    const keys = Object.keys(activity || {});
    if (keys.length === 0) {
        doc.font("Helvetica").fontSize(10).text("No activity fields available.", 60, currentY);
        return currentY + 18;
    }

    keys.forEach((key) => {
        if (currentY > 760) {
            doc.addPage();
            currentY = 50;
        }
        const label = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (char) => char.toUpperCase());
        doc
            .font("Helvetica")
            .fontSize(10)
            .text(`${label}: ${activity[key]}`, 60, currentY, { width: 500 });
        currentY += 16;
    });

    return currentY + 10;
}

function streamPdf(res, fileName, buildDocument) {
    const doc = new PDFDocument({ margin: 50 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=\"${fileName}\"`);
    doc.pipe(res);
    buildDocument(doc);
    doc.end();
}

exports.addNAACData = async (req, res) => {
    try {
        const { teacherName, amountProvided, year, duration } = req.body;

        const faculty = getLoggedInFaculty(req);
        const activityData = normalizePayload(req.body);

        const newData = new Criterion3({
            formType: "seed-money",
            teacherName,
            amountProvided,
            year,
            duration,
            category: "seed-money",
            activityData,
            documentLink: req.file ? req.file.path : "",
            facultyName: faculty.name,
            facultyEmail: faculty.email,
            submittedBy: faculty.id,
        });

        await newData.save();
        res.status(200).json({ success: true, message: "Data Saved!", data: newData });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.submitFacultyForm = async (req, res) => {
    try {
        const { formType } = req.params;

        if (!ALLOWED_FORM_TYPES.includes(formType)) {
            return res.status(400).json({
                success: false,
                message: "Invalid form type",
            });
        }

        const faculty = getLoggedInFaculty(req);
        if (!faculty.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized faculty",
            });
        }

        const activityData = normalizePayload(req.body);

        const newEntry = new Criterion3({
            formType,
            category: formType,
            teacherName: req.body.teacherName || faculty.name,
            year: req.body.year || req.body.yearOfAward || req.body.yearOfPublication || req.body.yearOfReceiving,
            amountProvided: req.body.amountProvided || req.body.seedMoneyAmount,
            duration: req.body.duration || req.body.yearOfCompletion,
            titleOfPaper: req.body.titleOfPaper || req.body.paperTitle,
            journalName: req.body.journalName || req.body.nameOfJournal,
            issnNumber: req.body.issnNumber,
            activityData,
            documentLink: req.file ? req.file.path : "",
            facultyName: faculty.name,
            facultyEmail: faculty.email,
            submittedBy: faculty.id,
        });

        await newEntry.save();

        return res.status(201).json({
            success: true,
            message: `${FORM_TITLES[formType]} data saved successfully`,
            data: newEntry,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to save faculty form",
            error: error.message,
        });
    }
};

exports.getFacultyFormsData = async (req, res) => {
    try {
        const faculty = getLoggedInFaculty(req);
        if (!faculty.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized faculty",
            });
        }

        const { formType } = req.query;
        const filter = { submittedBy: faculty.id };

        if (formType) {
            filter.formType = formType;
        }

        const entries = await Criterion3.find(filter).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: entries,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch faculty data",
            error: error.message,
        });
    }
};

exports.generateIndividualFormReport = async (req, res) => {
    try {
        const faculty = getLoggedInFaculty(req);
        const { formType } = req.query;

        if (!faculty.id) {
            return res.status(401).json({ success: false, message: "Unauthorized faculty" });
        }

        if (!formType || !ALLOWED_FORM_TYPES.includes(formType)) {
            return res.status(400).json({
                success: false,
                message: "formType query is required and must be valid",
            });
        }

        const records = await Criterion3.find({
            submittedBy: faculty.id,
            formType,
        }).sort({ createdAt: -1 });

        const fileName = `CR-Individual-${formType}.pdf`;
        streamPdf(res, fileName, (doc) => {
            doc.font("Helvetica-Bold").fontSize(16).text("CR (Individual Form)");
            doc.moveDown();
            doc.font("Helvetica").fontSize(11).text(`Faculty: ${faculty.name}`);
            doc.text(`Email: ${faculty.email || "N/A"}`);
            doc.text(`Form: ${FORM_TITLES[formType]}`);
            doc.text(`Generated On: ${new Date().toLocaleString()}`);
            doc.moveDown();

            if (!records.length) {
                doc.text("No activities found for this form.");
                return;
            }

            let currentY = doc.y;
            records.forEach((record, index) => {
                if (currentY > 740) {
                    doc.addPage();
                    currentY = 50;
                }
                currentY = writeActivityBlock(
                    doc,
                    `Activity ${index + 1} (${new Date(record.createdAt).toLocaleDateString()})`,
                    record.activityData,
                    currentY
                );
            });
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to generate individual report",
            error: error.message,
        });
    }
};

exports.generateConsolidatedReport = async (req, res) => {
    try {
        const faculty = getLoggedInFaculty(req);
        if (!faculty.id) {
            return res.status(401).json({ success: false, message: "Unauthorized faculty" });
        }

        const records = await Criterion3.find({
            submittedBy: faculty.id,
            formType: { $in: ALLOWED_FORM_TYPES },
        }).sort({ formType: 1, createdAt: -1 });

        const grouped = records.reduce((acc, entry) => {
            const key = entry.formType || "others";
            if (!acc[key]) acc[key] = [];
            acc[key].push(entry);
            return acc;
        }, {});

        streamPdf(res, "CR-Common-All-Forms.pdf", (doc) => {
            doc.font("Helvetica-Bold").fontSize(16).text("CR (Common for All Forms)");
            doc.moveDown();
            doc.font("Helvetica").fontSize(11).text(`Faculty: ${faculty.name}`);
            doc.text(`Email: ${faculty.email || "N/A"}`);
            doc.text(`Generated On: ${new Date().toLocaleString()}`);
            doc.moveDown();

            if (!records.length) {
                doc.text("No activities found across forms.");
                return;
            }

            let currentY = doc.y;

            ALLOWED_FORM_TYPES.forEach((formType) => {
                const activities = grouped[formType] || [];
                if (!activities.length) return;

                if (currentY > 700) {
                    doc.addPage();
                    currentY = 50;
                }

                doc.font("Helvetica-Bold").fontSize(13).text(FORM_TITLES[formType], 50, currentY);
                currentY += 20;

                activities.forEach((record, index) => {
                    currentY = writeActivityBlock(
                        doc,
                        `Entry ${index + 1} (${new Date(record.createdAt).toLocaleDateString()})`,
                        record.activityData,
                        currentY
                    );
                });

                currentY += 8;
            });
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to generate consolidated report",
            error: error.message,
        });
    }
};