import React, { useState } from 'react';

const WorkshopsForm = () => {
  const [formData, setFormData] = useState({
    nameOfWorkshop: '',
    yearOfWorkshop: '',
    numberOfParticipants: '',
    dateFrom: '',
    dateTo: '',
    document: null,
    activityLink: '',
    photos: null,
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
      alert('Document file size must be less than 1MB');
      return;
    }
    if (formData.photos && formData.photos.size > 1024 * 1024) {
      alert('Photos file size must be less than 1MB');
      return;
    }
    console.log('Form submitted:', formData);
  };

  const handleReset = () => {
    setFormData({
      nameOfWorkshop: '',
      yearOfWorkshop: '',
      numberOfParticipants: '',
      dateFrom: '',
      dateTo: '',
      document: null,
      activityLink: '',
      photos: null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h2 className="text-xl font-bold">3.3.2 – Workshops / Seminars Form</h2>

      <div>
        <label className="block text-sm font-medium">Name of Workshop</label>
        <input
          type="text"
          name="nameOfWorkshop"
          value={formData.nameOfWorkshop}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Year of Workshop</label>
        <input
          type="number"
          name="yearOfWorkshop"
          value={formData.yearOfWorkshop}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Number of Participants
        </label>
        <input
          type="number"
          name="numberOfParticipants"
          value={formData.numberOfParticipants}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Date From</label>
        <input
          type="date"
          name="dateFrom"
          value={formData.dateFrom}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Date To</label>
        <input
          type="date"
          name="dateTo"
          value={formData.dateTo}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
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

      <div>
        <label className="block text-sm font-medium">Activity Link</label>
        <input
          type="url"
          name="activityLink"
          value={formData.activityLink}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Photos (ZIP file)</label>
        <input
          type="file"
          name="photos"
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

export default WorkshopsForm;