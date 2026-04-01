const mongoose = require('mongoose');

const Criterion3Schema = new mongoose.Schema({
    // Yeh field batayega ki data kis category ka hai (Seed Money ya Research Paper)
    category: { 
        type: String, 
        required: true, 
        enum: ['seed-money', 'research-publication', 'fellowship', 'collaboration'] 
    },
    
    // Common Fields jo PPT mein hain
    teacherName: { type: String, required: true },
    // Aisa kar dene se bina department ke bhi data save ho jayega
    department: { type: String, required: false },
    year: { type: String, required: true },
    
    // Seed Money Specific (PPT Slide 31)
    amountProvided: { type: Number },
    duration: { type: String },
    
    // Research Publication Specific (PPT Slide 32)
    titleOfPaper: { type: String },
    journalName: { type: String },
    issnNumber: { type: String },
    
    // Document Upload (Aapke report ke mutabiq)
    documentLink: { type: String }, 
    
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Kisne entry ki
}, { timestamps: true });

module.exports = mongoose.model('Criterion3', Criterion3Schema);