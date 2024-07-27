import React from "react";
import { Link } from "react-router-dom";

const SideMenu = () => {
  const [showOptions, setShowOptions] = React.useState("campaign");

  return (
    <div className="bg-gradient-to-r from-gradientStart to-gradientEnd text-DarkBg h-screen w-64 p-5 shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Toingg</h1>
      <ul className="space-y-2">
        <li>
          <Link
            to="/"
            className="block p-2 rounded hover:bg-gray-200 transition duration-300"
          >
            Overview
          </Link>
        </li>
        <li>
          <button
            onClick={() =>
              setShowOptions(showOptions === "campaign" ? "" : "campaign")
            }
            className="block w-full text-left p-2 rounded hover:bg-gray-200 transition duration-300"
          >
            Campaign
          </button>
        </li>
        {showOptions === "campaign" && (
          <>
            <li>
              <Link
                to="/create-campaign"
                className="block p-2 pl-5 rounded hover:bg-gray-200 transition duration-300"
              >
                Create Campaign
              </Link>
            </li>
            <li>
              <Link
                to="/update-campaign"
                className="block p-2 pl-5 rounded hover:bg-gray-200 transition duration-300"
              >
                Update Campaign
              </Link>
            </li>
          </>
        )}
        <li>
          <button
            onClick={() => setShowOptions(showOptions === "call" ? "" : "call")}
            className="block w-full text-left p-2 rounded hover:bg-gray-200 transition duration-300"
          >
            Call
          </button>
        </li>
        {showOptions === "call" && (
          <>
            <li>
              <Link
                to="/create-call"
                className="block p-2 pl-5 rounded hover:bg-gray-200 transition duration-300"
              >
                Create Call
              </Link>
            </li>
            <li>
              <Link
                to="/update-call"
                className="block p-2 pl-5 rounded hover:bg-gray-200 transition duration-300"
              >
                Update Call
              </Link>
            </li>
          </>
        )}
      </ul>
      <div className="mt-6 flex items-center">
        <img
          src="https://placehold.co/40x40"
          alt="profile"
          className="rounded-full"
        />
        <span className="ml-2 text-lg">Profile</span>
      </div>
    </div>
  );
};

export default SideMenu;
