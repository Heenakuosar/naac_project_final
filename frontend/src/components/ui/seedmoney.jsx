import React, { useState } from 'react'
import toast from 'react-hot-toast'
import FacultyService from '@/service/facultyService'

const SeedMoneyForm = () => {
  const [formData, setFormData] = useState({
    teacherName: '',
    seedMoneyAmount: '',
    yearOfReceiving: '',
    yearOfCompletion: '',
    document: null
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'document') {
      setFormData({ ...formData, [name]: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  // 2. Updated Submit Logic
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Kyunki aap file upload kar rahe hain, humein simple JSON ki jagah 
    // "FormData" object use karna padta hai
    const dataToSend = new FormData();
    dataToSend.append('teacherName', formData.teacherName);
    dataToSend.append('seedMoneyAmount', formData.seedMoneyAmount);
    dataToSend.append('yearOfReceiving', formData.yearOfReceiving);
    dataToSend.append('yearOfCompletion', formData.yearOfCompletion);
    if(formData.document) {
        dataToSend.append('document', formData.document);
    }

    try {
      await FacultyService.submitFacultyForm(FacultyService.FACULTY_FORM_TYPES.SEED_MONEY, dataToSend);
      toast.success('Data successfully saved!');
      handleReset(); // Form reset kar dein
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to save data');
    }
  }

  const handleReset = () => {
    setFormData({
      teacherName: '',
      seedMoneyAmount: '',
      yearOfReceiving: '',
      yearOfCompletion: '',
      document: null
    })
  }

  const generateReport = async () => {
    try {
      const blob = await FacultyService.downloadIndividualReport(
        FacultyService.FACULTY_FORM_TYPES.SEED_MONEY
      )
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'CR-Individual-seed-money.pdf'
      link.click()
      URL.revokeObjectURL(url)
      toast.success('PDF report downloaded')
    } catch {
      toast.error('Failed to generate PDF report')
    }
  }

  const generateCommonReport = async () => {
    try {
      const blob = await FacultyService.downloadConsolidatedReport()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'CR-Common-All-Forms.pdf'
      link.click()
      URL.revokeObjectURL(url)
      toast.success('Common PDF report downloaded')
    } catch {
      toast.error('Failed to generate common PDF report')
    }
  }

  return (
    <div
      className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm flex justify-center items-center"
      style={{ minHeight: '100vh', backgroundColor: '#541c1c' }}
    >
      <div
        className="bg-custom-color rounded-lg p-8 shadow-lg"
        style={{ backgroundColor: '#e6f7ff', width: '100%', maxWidth: '600px' }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">3.1.2: SEED MONEY</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="teacherName" className="block text-sm font-medium text-gray-700">
              NAME OF TEACHER
            </label>
            <input
              type="text"
              id="teacherName"
              name="teacherName"
              value={formData.teacherName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter teacher name"
              required
            />
          </div>
          <div>
            <label htmlFor="seedMoneyAmount" className="block text-sm font-medium text-gray-700">
              AMOUNT OF SEED MONEY
            </label>
            <input
              type="number"
              id="seedMoneyAmount"
              name="seedMoneyAmount"
              value={formData.seedMoneyAmount}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter amount"
              required
            />
          </div>
          <div>
            <label htmlFor="yearOfReceiving" className="block text-sm font-medium text-gray-700">
              YEAR OF RECEIVING
            </label>
            <input
              type="number"
              id="yearOfReceiving"
              name="yearOfReceiving"
              value={formData.yearOfReceiving}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter year"
              required
            />
          </div>
          <div>
            <label htmlFor="yearOfCompletion" className="block text-sm font-medium text-gray-700">
              YEAR OF COMPLETION
            </label>
            <input
              type="number"
              id="yearOfCompletion"
              name="yearOfCompletion"
              value={formData.yearOfCompletion}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter year"
              required
            />
          </div>
          <div>
            <label htmlFor="document" className="block text-sm font-medium text-gray-700">
              UPLOAD DOCUMENT (Max: 1MB)
            </label>
            <input
              type="file"
              id="document"
              name="document"
              onChange={handleChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
          </div>
          <div className="flex space-x-4 justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              SUBMIT
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              RESET
            </button>
            <button
              type="button"
              onClick={generateReport}
              className="px-6 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              GENERATE REPORT (PDF)
            </button>
            <button
              type="button"
              onClick={generateCommonReport}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              GENERATE COMMON REPORT (PDF)
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SeedMoneyForm