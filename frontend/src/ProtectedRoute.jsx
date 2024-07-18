import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useStoredNick from "./hooks/useStoredNick";

const ProtectedRoute = ({ children }) => {
  const [nick] = useStoredNick();

  if (!nick || nick === "empty") {
    return <Navigate to={"/"} replace />;
  }
  return children;
};

export default ProtectedRoute;
