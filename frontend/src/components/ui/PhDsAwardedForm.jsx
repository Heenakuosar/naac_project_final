import React, { useState } from 'react';
import toast from 'react-hot-toast';
import FacultyService from '@/service/facultyService';

const PhDsAwardedForm = () => {
  const [formData, setFormData] = useState({
    nameOfScholar: '',
    nameOfGuide: '',
    titleOfThesis: '',
    yearOfRegistration: '',
    yearOfAward: '',
    document: null,
  });

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

    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      dataToSend.append(key, formData[key]);
    });

    try {
      await FacultyService.submitFacultyForm(FacultyService.FACULTY_FORM_TYPES.PHDS_AWARDED, dataToSend);
      toast.success('Data Successfully saved!');
      handleReset();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to save data');
    }
  };

  const generateReport = async () => {
    try {
      const blob = await FacultyService.downloadIndividualReport(
        FacultyService.FACULTY_FORM_TYPES.PHDS_AWARDED
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'CR-Individual-phds-awarded.pdf';
      link.click();
      URL.revokeObjectURL(url);
      toast.success('PDF report downloaded');
    } catch {
      toast.error('Failed to generate PDF report');
    }
  };

  const generateCommonReport = async () => {
    try {
      const blob = await FacultyService.downloadConsolidatedReport();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'CR-Common-All-Forms.pdf';
      link.click();
      URL.revokeObjectURL(url);
      toast.success('Common PDF report downloaded');
    } catch {
      toast.error('Failed to generate common PDF report');
    }
  };

  const handleReset = () => {
    setFormData({
      nameOfScholar: '',
      nameOfGuide: '',
      titleOfThesis: '',
      yearOfRegistration: '',
      yearOfAward: '',
      document: null,
    });
  };

  return (
    <div className="form-container">
      <h2>3.4.4: PhD's Awarded</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name of Scholar:
          <input
            type="text"
            name="nameOfScholar"
            value={formData.nameOfScholar}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Name of Guide:
          <input
            type="text"
            name="nameOfGuide"
            value={formData.nameOfGuide}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Title of Thesis:
          <input
            type="text"
            name="titleOfThesis"
            value={formData.titleOfThesis}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Year of Registration:
          <input
            type="number"
            name="yearOfRegistration"
            value={formData.yearOfRegistration}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Year of Award:
          <input
            type="number"
            name="yearOfAward"
            value={formData.yearOfAward}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Upload Document (Max: 1MB):
          <input
            type="file"
            name="document"
            onChange={handleChange}
            accept=".pdf,.doc,.docx,.jpg,.png"
          />
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>Reset</button>
        <button type="button" onClick={generateReport}>Generate Report (PDF)</button>
        <button type="button" onClick={generateCommonReport}>Generate Common Report (PDF)</button>
      </form>
    </div>
  );
};

export default PhDsAwardedForm;