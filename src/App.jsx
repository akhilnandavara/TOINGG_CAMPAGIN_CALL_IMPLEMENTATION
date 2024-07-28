// src/App.jsx
// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideMenu from "./components/SideMenu";
import LoginSignup from "./pages/Login";
import CampaignFeatures from "./pages/CampaignFeatures";
import Overview from "./pages/Overview";


const App = () => {
  return (
    <Router>
      <div className="flex overflow-hidden ">
        <SideMenu />
        <div className="flex-grow p-10 bg-primary text-primary">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/create-campaign" element={<CampaignFeatures isUpdate={false} />} />
            <Route path="/update-campaign" element={<CampaignFeatures isUpdate={true} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
