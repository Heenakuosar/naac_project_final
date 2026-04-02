import React, { useState } from 'react';
import toast from 'react-hot-toast';
import FacultyService from '@/service/facultyService';

const BooksForm = () => {
  const [formData, setFormData] = useState({
    bookTitle: '',
    paperTitle: '',
    nameOfTeacher: '',
    nameOfPublication: '',
    yearOfPublication: '',
    conferenceName: '',
    issnNumber: '',
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
      await FacultyService.submitFacultyForm(FacultyService.FACULTY_FORM_TYPES.BOOKS, dataToSend);
      toast.success('Data Successfully saved!');
      handleReset();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to save data');
    }
  };

  const generateReport = async () => {
    try {
      const blob = await FacultyService.downloadIndividualReport(
        FacultyService.FACULTY_FORM_TYPES.BOOKS
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'CR-Individual-books.pdf';
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
      bookTitle: '',
      paperTitle: '',
      nameOfTeacher: '',
      nameOfPublication: '',
      yearOfPublication: '',
      conferenceName: '',
      issnNumber: '',
      document: null,
    });
  };

  return (
    <div className="form-container">
      <h2>3.4.6.1: Books</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Book Title:
          <input
            type="text"
            name="bookTitle"
            value={formData.bookTitle}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Paper Title:
          <input
            type="text"
            name="paperTitle"
            value={formData.paperTitle}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Name of Teacher:
          <input
            type="text"
            name="nameOfTeacher"
            value={formData.nameOfTeacher}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Name of Publication:
          <input
            type="text"
            name="nameOfPublication"
            value={formData.nameOfPublication}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Year of Publication:
          <input
            type="number"
            name="yearOfPublication"
            value={formData.yearOfPublication}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Conference Name:
          <input
            type="text"
            name="conferenceName"
            value={formData.conferenceName}
            onChange={handleChange}
          />
        </label>
        <label>
          ISSN Number:
          <input
            type="text"
            name="issnNumber"
            value={formData.issnNumber}
            onChange={handleChange}
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

export default BooksForm;