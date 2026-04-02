import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import FacultyService from "@/service/facultyService";

const formConfigs = [
  {
    key: FacultyService.FACULTY_FORM_TYPES.SEED_MONEY,
    title: "Seed Money",
    fields: [
      { name: "teacherName", label: "Teacher Name", type: "text", required: true },
      { name: "seedMoneyAmount", label: "Amount of Seed Money", type: "number", required: true },
      { name: "yearOfReceiving", label: "Year of Receiving", type: "number", required: true },
      { name: "yearOfCompletion", label: "Year of Completion", type: "number", required: true },
    ],
  },
  {
    key: FacultyService.FACULTY_FORM_TYPES.AWARDS,
    title: "Awards",
    fields: [
      { name: "nameOfAward", label: "Name of Award", type: "text", required: true },
      { name: "awardName", label: "Award Name", type: "text", required: true },
      { name: "awardingAgency", label: "Awarding Agency", type: "text", required: true },
      { name: "yearOfAward", label: "Year of Award", type: "number", required: true },
    ],
  },
  {
    key: FacultyService.FACULTY_FORM_TYPES.INNOVATIONS,
    title: "Innovations",
    fields: [
      { name: "titleOfInnovation", label: "Title of Innovation", type: "text", required: true },
      { name: "innovationName", label: "Innovation Name", type: "text", required: true },
      { name: "awardName", label: "Award Name", type: "text" },
      { name: "awardingAgency", label: "Awarding Agency", type: "text" },
      { name: "yearOfAward", label: "Year of Award", type: "number" },
    ],
  },
  {
    key: FacultyService.FACULTY_FORM_TYPES.PATENTS_PUBLISHED,
    title: "Patents Published",
    fields: [
      { name: "nameOfPatenter", label: "Name of Patenter", type: "text", required: true },
      { name: "patentNumber", label: "Patent Number", type: "text", required: true },
      { name: "titleOfPatent", label: "Title of Patent", type: "text", required: true },
      { name: "yearOfAward", label: "Year of Award", type: "number", required: true },
    ],
  },
  {
    key: FacultyService.FACULTY_FORM_TYPES.PHDS_AWARDED,
    title: "PhDs Awarded",
    fields: [
      { name: "nameOfScholar", label: "Name of Scholar", type: "text", required: true },
      { name: "nameOfGuide", label: "Name of Guide", type: "text", required: true },
      { name: "titleOfThesis", label: "Title of Thesis", type: "text", required: true },
      { name: "yearOfRegistration", label: "Year of Registration", type: "number", required: true },
      { name: "yearOfAward", label: "Year of Award", type: "number", required: true },
    ],
  },
  {
    key: FacultyService.FACULTY_FORM_TYPES.RESEARCH_PAPERS,
    title: "Research Papers",
    fields: [
      { name: "titleOfPaper", label: "Title of Paper", type: "text", required: true },
      { name: "nameOfAuthors", label: "Name of Authors", type: "text", required: true },
      { name: "nameOfJournal", label: "Name of Journal", type: "text", required: true },
      { name: "yearOfPublication", label: "Year of Publication", type: "number", required: true },
      { name: "issnNumber", label: "ISSN Number", type: "text" },
      { name: "ugcLink", label: "UGC Link", type: "url" },
    ],
  },
  {
    key: FacultyService.FACULTY_FORM_TYPES.BOOKS,
    title: "Books",
    fields: [
      { name: "bookTitle", label: "Book Title", type: "text", required: true },
      { name: "paperTitle", label: "Paper Title", type: "text", required: true },
      { name: "nameOfTeacher", label: "Name of Teacher", type: "text", required: true },
      { name: "nameOfPublication", label: "Name of Publication", type: "text", required: true },
      { name: "yearOfPublication", label: "Year of Publication", type: "number", required: true },
      { name: "conferenceName", label: "Conference Name", type: "text" },
      { name: "issnNumber", label: "ISSN Number", type: "text" },
    ],
  },
];

const buildInitialState = () => {
  const state = {};
  formConfigs.forEach((form) => {
    state[form.key] = form.fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {});
    state[form.key].document = null;
  });
  return state;
};

const FacultyForms = () => {
  const [forms, setForms] = useState(buildInitialState());
  const [reportType, setReportType] = useState("individual");
  const [selectedFormType, setSelectedFormType] = useState(
    FacultyService.FACULTY_FORM_TYPES.SEED_MONEY
  );
  const [submittingForm, setSubmittingForm] = useState("");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const formTitleMap = useMemo(
    () =>
      formConfigs.reduce((acc, item) => {
        acc[item.key] = item.title;
        return acc;
      }, {}),
    []
  );

  const handleChange = (formKey, event) => {
    const { name, value, files } = event.target;
    setForms((prev) => ({
      ...prev,
      [formKey]: {
        ...prev[formKey],
        [name]: name === "document" ? files?.[0] || null : value,
      },
    }));
  };

  const handleReset = (formKey) => {
    setForms((prev) => ({
      ...prev,
      [formKey]: {
        ...buildInitialState()[formKey],
      },
    }));
  };

  const handleSubmit = async (formKey) => {
    try {
      setSubmittingForm(formKey);
      const payload = new FormData();
      const values = forms[formKey];

      Object.keys(values).forEach((key) => {
        if (values[key] !== null && values[key] !== "") {
          payload.append(key, values[key]);
        }
      });

      await FacultyService.submitFacultyForm(formKey, payload);
      toast.success(`${formTitleMap[formKey]} submitted successfully`);
      handleReset(formKey);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit form");
    } finally {
      setSubmittingForm("");
    }
  };

  const downloadBlob = (blob, fileName) => {
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(objectUrl);
  };

  const handleGenerateReport = async () => {
    try {
      setIsGeneratingReport(true);

      if (reportType === "individual") {
        const blob = await FacultyService.downloadIndividualReport(selectedFormType);
        downloadBlob(blob, `CR-Individual-${selectedFormType}.pdf`);
        toast.success("Individual CR PDF downloaded");
        return;
      }

      const blob = await FacultyService.downloadConsolidatedReport();
      downloadBlob(blob, "CR-Common-All-Forms.pdf");
      toast.success("Common CR PDF downloaded");
    } catch (error) {
      toast.error("Failed to generate PDF report");
    } finally {
      setIsGeneratingReport(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-3xl border border-gray-200 p-5">
        <h1 className="text-2xl font-bold text-gray-900">Faculty Section</h1>
        <p className="text-sm text-gray-600 mt-1">
          All required forms are available below. CR reports are generated in PDF format only.
        </p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-xl p-2"
            >
              <option value="individual">CR (Individual Forms)</option>
              <option value="common">CR (Common for All Forms)</option>
            </select>
          </div>

          {reportType === "individual" && (
            <div>
              <label className="text-sm font-medium text-gray-700">Form</label>
              <select
                value={selectedFormType}
                onChange={(e) => setSelectedFormType(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-xl p-2"
              >
                {formConfigs.map((form) => (
                  <option key={form.key} value={form.key}>
                    {form.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Button
            type="button"
            onClick={handleGenerateReport}
            disabled={isGeneratingReport}
            className="rounded-xl"
          >
            {isGeneratingReport ? "Generating..." : "Generate Report"}
          </Button>
        </div>
      </div>

      {formConfigs.map((form) => (
        <div key={form.key} className="bg-white rounded-3xl border border-gray-200 p-5">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{form.title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {form.fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                <input
                  name={field.name}
                  type={field.type}
                  value={forms[form.key][field.name]}
                  onChange={(event) => handleChange(form.key, event)}
                  className="mt-1 block w-full border border-gray-300 rounded-xl p-2"
                  required={field.required}
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700">Document</label>
              <input
                name="document"
                type="file"
                onChange={(event) => handleChange(form.key, event)}
                accept=".pdf,.doc,.docx,.jpg,.png"
                className="mt-1 block w-full border border-gray-300 rounded-xl p-2"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <Button
              type="button"
              onClick={() => handleSubmit(form.key)}
              disabled={submittingForm === form.key}
              className="rounded-xl"
            >
              {submittingForm === form.key ? "Submitting..." : "Submit"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleReset(form.key)}
              className="rounded-xl"
            >
              Reset
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FacultyForms;
