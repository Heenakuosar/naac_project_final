import React, { useState } from 'react';
import axios from 'axios';

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
      await axios.post('http://127.0.0.1:8000/api/criteria3/phds', dataToSend);
      alert('✅ Data Successfully saved!');
      handleReset();
    } catch (err) {
      console.error('Error:', err);
      alert(`❌ Error: ${err.response?.data?.error || err.message}`);
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
      </form>
    </div>
  );
};

export default PhDsAwardedForm;