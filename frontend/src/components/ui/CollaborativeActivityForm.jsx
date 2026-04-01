import React, { useState } from 'react';
import axios from 'axios';

const CollaborativeActivityForm = () => {
  const [formData, setFormData] = useState({
    titleOfActivity: '',
    nameOfAgency: '',
    nameOfParticipant: '',
    yearOfCollaboration: '',
    natureOfActivity: '',
    durationFrom: '',
    durationTo: '',
    linkDocument: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/api/criteria3/collaborative-activity', formData);
      alert('✅ Data Successfully saved!');
      handleReset();
    } catch (err) {
      console.error('Error:', err);
      alert(`❌ Error: ${err.response?.data?.error || err.message}`);
    }
  };

  const handleReset = () => {
    setFormData({
      titleOfActivity: '',
      nameOfAgency: '',
      nameOfParticipant: '',
      yearOfCollaboration: '',
      natureOfActivity: '',
      durationFrom: '',
      durationTo: '',
      linkDocument: '',
    });
  };

  return (
    <div className="form-container">
      <h2>3.7.1: Collaborative Activity</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title of Activity:
          <input
            type="text"
            name="titleOfActivity"
            value={formData.titleOfActivity}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Name of Agency:
          <input
            type="text"
            name="nameOfAgency"
            value={formData.nameOfAgency}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Name of Participant:
          <input
            type="text"
            name="nameOfParticipant"
            value={formData.nameOfParticipant}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Year of Collaboration:
          <input
            type="number"
            name="yearOfCollaboration"
            value={formData.yearOfCollaboration}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Nature of Activity:
          <input
            type="text"
            name="natureOfActivity"
            value={formData.natureOfActivity}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Duration From:
          <input
            type="date"
            name="durationFrom"
            value={formData.durationFrom}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Duration To:
          <input
            type="date"
            name="durationTo"
            value={formData.durationTo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Link Document:
          <input
            type="url"
            name="linkDocument"
            value={formData.linkDocument}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
    </div>
  );
};

export default CollaborativeActivityForm;