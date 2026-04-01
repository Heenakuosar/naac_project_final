import React, { useState } from 'react';
import axios from 'axios';

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
      await axios.post('http://127.0.0.1:8000/api/criteria3/books', dataToSend);
      alert('✅ Data Successfully saved!');
      handleReset();
    } catch (err) {
      console.error('Error:', err);
      alert(`❌ Error: ${err.response?.data?.error || err.message}`);
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
      </form>
    </div>
  );
};

export default BooksForm;