import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error("Token validation failed:", error.message);
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
