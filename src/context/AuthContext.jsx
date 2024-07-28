import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  // Add prop validation for 'children'
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [isLogin, setIsLogin] = useState(false);
  const toggleLogin = () => setIsLogin(!isLogin);
  return (
    <AuthContext.Provider value={{ isLogin, toggleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
