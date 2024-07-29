import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import PropTypes from "prop-types";

const SideMenu = ({ isExpanded, setIsExpanded }) => {
  SideMenu.propTypes = {
    isExpanded: PropTypes.bool.isRequired,
    setIsExpanded: PropTypes.func.isRequired,
  };

  const [showOptions, setShowOptions] = React.useState("");
  const { isLogin, toggleLogin } = useAuthContext();

  const username = JSON.parse(localStorage.getItem("user"))?.username;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isExpanded ? "max-xs:w-full max-sm:w-40 w-64" : "max-xs:w-10 w-24"
        } py-4 bg-gradient-to-r transition-all duration-300 z-[1000] fixed h-full from-gradientStart to-gradientEnd text-DarkBg shadow-lg`}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <button
              className="m-2 p-2 rounded hover:bg-gray-200 transition duration-300"
              onClick={toggleExpand}
            >
              {isExpanded ? "Collapse" : "Expand"}
            </button>
            <ul className={` ${!isExpanded && "text-xs"} space-y-2 mt-4`}>
              <li
                className={` ${
                  !isExpanded && "text-lg"
                } text-3xl mb-2 font-bold text-center`}
              >
                <Link to={"/"}>Toingg</Link>
              </li>
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
                  className={`block w-full text-left p-2 rounded hover:bg-gray-200 transition duration-300`}
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
                  onClick={() =>
                    setShowOptions(showOptions === "call" ? "" : "call")
                  }
                  className="block w-full text-left p-2 rounded hover:bg-gray-200 transition duration-300"
                >
                  Call
                </button>
              </li>
              {showOptions === "call" && (
                <>
                  <li>
                    <Link
                      to="/call-feature"
                      className="block p-2 pl-5 rounded hover:bg-gray-200 transition duration-300"
                    >
                      Create Call
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/call-log"
                      className="block  p-2 pl-5 rounded hover:bg-gray-200 transition duration-300"
                    >
                      Call Log
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div>
            {isLogin ? (
              <div>
                {showOptions === "profile" && (
                  <ul>
                    <li>
                      <Link
                        to="/"
                        className="block max-sm:text-sm p-2 pl-5 rounded hover:bg-gray-200 transition duration-300"
                      >
                        Settings
                      </Link>
                    </li>
                    <li className="block max-sm:text-sm p-2 pl-5 w-full hover:bg-gray-200 transition duration-300">
                      <button onClick={toggleLogin}>Logout</button>
                    </li>
                  </ul>
                )}
                {/* profile */}
                <div
                  onClick={() =>
                    setShowOptions(showOptions === "profile" ? "" : "profile")
                  }
                  className={`m-2 flex items-center p-2 rounded hover:bg-gray-200 transition duration-300`}
                >
                  <img
                    src={`https://ui-avatars.com/api/?name=${username}&background=random&rounded=true&color=fff`}
                    alt="profile"
                    className=" w-10 sm:w-14 sm:h-14 rounded-full"
                  />
                  {isExpanded && (
                    <span className="ml-2 text-sm sm:text-lg ">{username}</span>
                  )}
                </div>
              </div>
            ) : (
              <div className=" w-fit mx-auto">
                <Link
                  to="/login"
                  className={`${
                    !isExpanded && "text-xs m-2"
                  }  bg-DarkBg hover:opacity-95 text-white px-4    py-2 rounded-md`}
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
