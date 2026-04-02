import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "../components/sidebar";
import Dashboard from "../views/dashboard/dashboard";
import SeedMoneyForm from "../components/ui/seedmoney";
import FacultyList from "../views/faculty/FacultyList";
import FacultyDetail from "../views/faculty/FacultyDetail";
import Award from "../views/forms/award";
import Fellowship from "../views/forms/fellowship";
import Workshops from "../views/forms/workshops";
import InnovationForm from "../components/ui/InnovationForm";
import PatentsPublishedForm from "../components/ui/PatentsPublishedForm";
import PhDsAwardedForm from "../components/ui/PhDsAwardedForm";
import ResearchPapersForm from "../components/ui/ResearchPapersForm";
import BooksForm from "../components/ui/BooksForm";
import CollaborativeActivityForm from "../components/ui/CollaborativeActivityForm";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 bg-gray-100">
        <Routes>
          {/* Default dashboard */}
          <Route
            path="/"
            element={<Dashboard />}
          />

          {/* Seed Money Form – new page */}
          <Route path="seed-money" element={<SeedMoneyForm />} />
          
          {/* New Forms */}
          <Route path="innovation" element={<InnovationForm />} />
          <Route path="patents-published" element={<PatentsPublishedForm />} />
          <Route path="phds-awarded" element={<PhDsAwardedForm />} />
          <Route path="research-papers" element={<ResearchPapersForm />} />
          <Route path="books" element={<BooksForm />} />
          <Route path="collaborative-activity" element={<CollaborativeActivityForm />} />

          {/* Other forms */}
          <Route path="award" element={<Award />} />
          <Route path="fellowship" element={<Fellowship />} />
          <Route path="workshops" element={<Workshops />} />

          {/* Faculty routes */}
          <Route path="faculty" element={<FacultyList />} />
          <Route path="faculty/:id" element={<FacultyDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;