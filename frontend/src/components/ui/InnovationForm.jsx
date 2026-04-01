import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import './InnovationForm.css';

const InnovationForm = () => {
  const [formData, setFormData] = useState({
    titleOfInnovation: '',
    innovationName: '',
    awardName: '',
    awardingAgency: '',
    yearOfAward: '',
    document: null,
    category: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.titleOfInnovation) newErrors.titleOfInnovation = 'Title of Innovation is required';
    if (!formData.innovationName) newErrors.innovationName = 'Innovation Name is required';
    if (formData.document && formData.document.size > 1024 * 1024) {
      newErrors.document = 'File size must be less than 1MB';
    }
    if (formData.yearOfAward && !/^(19|20)\d{2}$/.test(formData.yearOfAward)) {
      newErrors.yearOfAward = 'Enter a valid year (e.g., 2023)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'document') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      dataToSend.append(key, formData[key]);
    });

    setIsSubmitting(true);
    try {
      await axios.post('http://127.0.0.1:8000/api/criteria3/innovation', dataToSend);
      alert('✅ Data successfully saved!');
      handleReset();
    } catch (err) {
      console.error('Error:', err);
      alert(`❌ Error: ${err.response?.data?.error || err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      titleOfInnovation: '',
      innovationName: '',
      awardName: '',
      awardingAgency: '',
      yearOfAward: '',
      document: null,
      category: '',
    });
    setErrors({});
  };

  const generateReport = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/criteria3/innovation-report');
      const allData = response.data;

      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text('Innovation Report', 10, 10);

      allData.forEach((data, index) => {
        doc.setFontSize(12);
        doc.text(
          `Record ${index + 1}:
Title of Innovation: ${data.titleOfInnovation}
Innovation Name: ${data.innovationName}
Award Name: ${data.awardName}
Awarding Agency: ${data.awardingAgency}
Year of Award: ${data.yearOfAward}
Category: ${data.category}
`,
          10,
          20 + index * 30
        );
      });

      doc.save('InnovationReport.pdf');
    } catch (error) {
      console.error('Error generating report:', error);
      alert('❌ Failed to generate report.');
    }
  };

  return (
    <div className="form-card">
      <h2>3.3.3: Innovation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titleOfInnovation">Title of Innovation *</label>
          <input
            type="text"
            id="titleOfInnovation"
            name="titleOfInnovation"
            value={formData.titleOfInnovation}
            onChange={handleChange}
            placeholder="Enter the title of the innovation"
          />
          {errors.titleOfInnovation && <span className="error-message">{errors.titleOfInnovation}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="innovationName">Innovation Name *</label>
          <input
            type="text"
            id="innovationName"
            name="innovationName"
            value={formData.innovationName}
            onChange={handleChange}
            placeholder="Enter the innovation name"
          />
          {errors.innovationName && <span className="error-message">{errors.innovationName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="awardName">Award Name</label>
          <input
            type="text"
            id="awardName"
            name="awardName"
            value={formData.awardName}
            onChange={handleChange}
            placeholder="Enter the award name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="awardingAgency">Awarding Agency</label>
          <input
            type="text"
            id="awardingAgency"
            name="awardingAgency"
            value={formData.awardingAgency}
            onChange={handleChange}
            placeholder="Enter the awarding agency"
          />
        </div>

        <div className="form-group">
          <label htmlFor="yearOfAward">Year of Award</label>
          <input
            type="number"
            id="yearOfAward"
            name="yearOfAward"
            value={formData.yearOfAward}
            onChange={handleChange}
            placeholder="YYYY"
          />
          {errors.yearOfAward && <span className="error-message">{errors.yearOfAward}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="document">Upload Document (PDF/DOC/JPG, max 1MB)</label>
          <input
            type="file"
            id="document"
            name="document"
            accept=".pdf,.doc,.docx,.jpg,.png"
            onChange={handleChange}
          />
          {errors.document && <span className="error-message">{errors.document}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          <button type="button" className="btn-secondary" onClick={handleReset}>
            Reset
          </button>
          <button type="button" className="btn-outlined" onClick={generateReport}>
            Generate Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default InnovationForm;