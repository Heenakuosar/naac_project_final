import React, { useState } from 'react';

const AwardForm = () => {
  const [formData, setFormData] = useState({
    nameOfAward: '',
    awardName: '',
    awardingAgency: '',
    yearOfAward: '',
    statusOfProject: '',
    document: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.document && formData.document.size > 1024 * 1024) {
      alert('File size must be less than 1MB');
      return;
    }
    console.log('Form submitted:', formData);
  };

  const handleReset = () => {
    setFormData({
      nameOfAward: '',
      awardName: '',
      awardingAgency: '',
      yearOfAward: '',
      statusOfProject: '',
      document: null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h2 className="text-xl font-bold">3.1.3 – Award Form</h2>

      <div>
        <label className="block text-sm font-medium">Name of Award</label>
        <input
          type="text"
          name="nameOfAward"
          value={formData.nameOfAward}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Award Name</label>
        <input
          type="text"
          name="awardName"
          value={formData.awardName}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Awarding Agency</label>
        <input
          type="text"
          name="awardingAgency"
          value={formData.awardingAgency}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Year of Award</label>
        <input
          type="number"
          name="yearOfAward"
          value={formData.yearOfAward}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Status of Project</label>
        <div className="flex gap-4">
          <label>
            <input
              type="radio"
              name="statusOfProject"
              value="Ongoing"
              checked={formData.statusOfProject === 'Ongoing'}
              onChange={handleChange}
            />
            Ongoing
          </label>
          <label>
            <input
              type="radio"
              name="statusOfProject"
              value="Completed"
              checked={formData.statusOfProject === 'Completed'}
              onChange={handleChange}
            />
            Completed
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Upload Document</label>
        <input
          type="file"
          name="document"
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="flex gap-4">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default AwardForm;