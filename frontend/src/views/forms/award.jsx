import React, { useState } from 'react';
import toast from 'react-hot-toast';
import FacultyService from '@/service/facultyService';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.document && formData.document.size > 1024 * 1024) {
      toast.error('File size must be less than 1MB');
      return;
    }

    try {
      const dataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== '') {
          dataToSend.append(key, formData[key]);
        }
      });

      await FacultyService.submitFacultyForm(FacultyService.FACULTY_FORM_TYPES.AWARDS, dataToSend);
      toast.success('Data successfully saved!');
      handleReset();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to save data');
    }
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

  const generateReport = async () => {
    try {
      const blob = await FacultyService.downloadIndividualReport(
        FacultyService.FACULTY_FORM_TYPES.AWARDS
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'CR-Individual-awards.pdf';
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
        <button
          type="button"
          onClick={generateReport}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Generate Report (PDF)
        </button>
        <button
          type="button"
          onClick={generateCommonReport}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Generate Common Report (PDF)
        </button>
      </div>
    </form>
  );
};

export default AwardForm;