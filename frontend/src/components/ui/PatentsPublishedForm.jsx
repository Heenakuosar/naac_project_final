import React, { useState } from 'react';
import axios from 'axios';

const PatentsPublishedForm = () => {
  const [formData, setFormData] = useState({
    nameOfPatenter: '',
    patentNumber: '',
    titleOfPatent: '',
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
      await axios.post('http://127.0.0.1:8000/api/criteria3/patents', dataToSend);
      alert('✅ Data Successfully saved!');
      handleReset();
    } catch (err) {
      console.error('Error:', err);
      alert(`❌ Error: ${err.response?.data?.error || err.message}`);
    }
  };

  const handleReset = () => {
    setFormData({
      nameOfPatenter: '',
      patentNumber: '',
      titleOfPatent: '',
      yearOfAward: '',
      document: null,
    });
  };

  return (
    <div className="form-container">
      <h2>3.4.3: Patents Published</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name of Patenter:
          <input
            type="text"
            name="nameOfPatenter"
            value={formData.nameOfPatenter}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Patent Number:
          <input
            type="text"
            name="patentNumber"
            value={formData.patentNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Title of Patent:
          <input
            type="text"
            name="titleOfPatent"
            value={formData.titleOfPatent}
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
      </form>
    </div>
  );
};

export default PatentsPublishedForm;