import React, { useState } from 'react';
import axios from 'axios';

const ResearchPapersForm = () => {
  const [formData, setFormData] = useState({
    titleOfPaper: '',
    nameOfAuthors: '',
    nameOfJournal: '',
    yearOfPublication: '',
    issnNumber: '',
    ugcLink: '',
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
      await axios.post('http://127.0.0.1:8000/api/criteria3/research-papers', dataToSend);
      alert('✅ Data Successfully saved!');
      handleReset();
    } catch (err) {
      console.error('Error:', err);
      alert(`❌ Error: ${err.response?.data?.error || err.message}`);
    }
  };

  const handleReset = () => {
    setFormData({
      titleOfPaper: '',
      nameOfAuthors: '',
      nameOfJournal: '',
      yearOfPublication: '',
      issnNumber: '',
      ugcLink: '',
      document: null,
    });
  };

  return (
    <div className="form-container">
      <h2>3.4.5: Research Papers</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title of Paper:
          <input
            type="text"
            name="titleOfPaper"
            value={formData.titleOfPaper}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Name of Authors:
          <input
            type="text"
            name="nameOfAuthors"
            value={formData.nameOfAuthors}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Name of Journal:
          <input
            type="text"
            name="nameOfJournal"
            value={formData.nameOfJournal}
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
          ISSN Number:
          <input
            type="text"
            name="issnNumber"
            value={formData.issnNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Link to UGC Recognition:
          <input
            type="url"
            name="ugcLink"
            value={formData.ugcLink}
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

export default ResearchPapersForm;