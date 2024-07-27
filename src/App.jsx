// src/App.jsx
// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideMenu from "./components/SideMenu";
import CampaignFeatures from "./components/CampaignFeatures";



const App = () => {
  return (
    <Router>
      <div className="flex">
        <SideMenu />
        <div className="flex-grow p-10 bg-primary text-primary">
          <Routes>
            <Route path="/create-campaign" element={<CampaignFeatures />} />
            <Route path="/update-campaign" element={<CampaignFeatures />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
