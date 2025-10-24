import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { config } from "../../utils/config";
import { authHeader } from "./authHeader";

export function ProtectedRoute({ children }) {
  const [authCheck, setAuthCheck] = useState(true);

  const checkAuth = () => {
    return axios.get(config.apiUrl + "account/CheckAuthentication", {
      headers: {
        ...authHeader(),
        "Content-Type": "application/json",
      },
    });
  };
  checkAuth()
    .then((resp) => {
      setAuthCheck(resp.data);
    })
    .catch((error) => {
      setAuthCheck(false);
    });

  return authCheck && localStorage.getItem("user") ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
}