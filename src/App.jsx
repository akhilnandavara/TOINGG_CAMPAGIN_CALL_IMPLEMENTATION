// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideMenu from "./components/SideMenu";
import LoginSignup from "./pages/Login";
import CampaignFeatures from "./pages/CampaignFeatures";
import Overview from "./pages/Overview";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import CallFeature from "./pages/CallFeature";
import CallLog from "./pages/CallLog";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex overflow-hidden ">
          <SideMenu />
          <div className="flex-grow p-10 bg-primary text-primary">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route
                path="/create-campaign"
                element={
                  <ProtectedRoute>
                    <CampaignFeatures isUpdate={false} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/update-campaign"
                element={
                  <ProtectedRoute>
                    <CampaignFeatures isUpdate={true} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  <h1 className="text-black place-content-center items-center  h-screen flex  text-3xl font-bold">
                    Page Not Found
                  </h1>
                }
              />
              <Route
                path="/call-feature"
                element={
                  <ProtectedRoute>
                    <CallFeature />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/call-log"
                element={
                  <ProtectedRoute>
                    <CallLog />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
