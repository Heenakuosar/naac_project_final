import axios from "axios";
import Request from "@/config/apiConfig";

const FACULTY_FORM_TYPES = {
  SEED_MONEY: "seed-money",
  AWARDS: "awards",
  INNOVATIONS: "innovations",
  PATENTS_PUBLISHED: "patents-published",
  PHDS_AWARDED: "phds-awarded",
  RESEARCH_PAPERS: "research-papers",
  BOOKS: "books",
};

const submitFacultyForm = async (formType, data) =>
  Request({
    url: `criteria3/forms/${formType}`,
    method: "POST",
    data,
    secure: true,
    files: true,
  });

const downloadIndividualReport = async (formType) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/criteria3/reports/individual`,
    {
      params: { formType },
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const downloadConsolidatedReport = async () => {
  const token = localStorage.getItem("access_token");
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/criteria3/reports/consolidated`,
    {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const FacultyService = {
  FACULTY_FORM_TYPES,
  submitFacultyForm,
  downloadIndividualReport,
  downloadConsolidatedReport,
};

export default FacultyService;
