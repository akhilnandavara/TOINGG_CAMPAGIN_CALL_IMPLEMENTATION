// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
  };

  const { isLogin } = useAuthContext();

  return isLogin ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
