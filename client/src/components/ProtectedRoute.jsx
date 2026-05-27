import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("access_token");

  // IF USER NOT LOGGED IN

  if (!token) {

    return <Navigate to="/login" />;

  }

  // IF LOGGED IN

  return children;
}

export default ProtectedRoute;