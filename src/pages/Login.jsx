// src/LoginSignup.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const LoginSignup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const naviagte = useNavigate();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const { toggleLogin } = useAuthContext();

  const clearInputs = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginForm) {
      // Handle login logic
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        console.log(user.email, email, password);
        if (user.email === email && user.password === password) {
          toggleLogin();
          naviagte("/");
        } else if (user.email !== email && user.password !== password) {
          alert("User Not Found");
          clearInputs();
          setIsLoginForm(false);
        } else alert("Invalid Credentials");
      } else {
        alert("User not found");
        clearInputs();
        setIsLoginForm(false);
      }
    } else {
      // Handle signup logic
      localStorage.setItem(
        "user",
        JSON.stringify({ username, email, password })
      );
      clearInputs();
      toggleLogin();
      naviagte("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  ">
      <div className="bg-gradient-to-b from-gradientStart to-gradientEnd p-8 rounded-lg shadow-md w-full max-w-md text-DarkBg">
        <h2 className="text-2xl font-bold mb-6 ">
          {!isLoginForm ? "Login" : "Signup"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLoginForm && (
            <div className="mb-4">
              <label htmlFor="username" className="block  mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full p-3 rounded bg-primary bg-opacity-50 drop-shadow-md text-DarkBg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block  mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 rounded bg-primary bg-opacity-50 drop-shadow-md text-DarkBg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block  mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 rounded bg-primary bg-opacity-50 drop-shadow-md  text-DarkBg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 mb-4  rounded  bg-[#fba668] shadow-lg bg-opacity-50 hover:bg-opacity-100 transition-all duration-300  text-DarkBg font-semibold"
          >
            {isLoginForm ? "Login" : "Signup"}
          </button>
        </form>
        <button
          onClick={() => setIsLoginForm(!isLoginForm)}
          className="w-full p-3 bg-DarkBg border border-primary rounded text-primary font-semibold"
        >
          {isLoginForm ? "Switch to Signup" : "Switch to Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginSignup;
