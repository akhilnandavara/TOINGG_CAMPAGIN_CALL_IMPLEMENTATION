import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const SideMenu = () => {
  const [showOptions, setShowOptions] = React.useState("");
  const { isLogin, toggleLogin } = useAuthContext();
  const username = JSON.parse(localStorage.getItem("user"))?.username;

  return (
    <div className="bg-gradient-to-r  from-gradientStart overflow-hidden to-gradientEnd text-DarkBg h-screen min-w-48 box-content  shadow-lg">
      <div className="flex flex-col justify-between h-full">
        <>
          <ul className="space-y-2 ">
            <li className="text-3xl  mb-2 font-bold  text-center">
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
                className={` block w-full text-left p-2 rounded hover:bg-gray-200 transition duration-300`}
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
                    className="block p-2 pl-5 rounded hover:bg-gray-200 transition duration-300"
                  >
                    Call Log
                  </Link>
                </li>
              </>
            )}
          </ul>
        </>
        <>
          {isLogin ? (
            <div>
              {showOptions === "profile" && (
                <ul>
                  <li>
                    <Link
                      to="/create-campaign"
                      className="block p-2 pl-5 rounded hover:bg-gray-200 transition duration-300"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={toggleLogin}
                      className="block p-2 pl-5 rounded hover:bg-gray-200 transition duration-300"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
              {/* profile  */}
              <div
                onClick={() =>
                  setShowOptions(showOptions === "profile" ? "" : "profile")
                }
                className={` m-2 flex items-center p-2 rounded hover:bg-gray-200 transition duration-300`}
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${username}&background=random&rounded=true&color=fff`}
                  alt="profile"
                  className="w-14 h-14 rounded-full"
                />
                <span className="ml-2 text-lg ">{username}</span>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className=" bg-DarkBg text-white px-4 m-2 text-center  py-2 rounded-md"
            >
              Login
            </Link>
          )}
        </>
      </div>
    </div>
  );
};

export default SideMenu;
