import { Navigate } from "react-router-dom";

const ProtectedRouteStudents = ({ children }) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/studentLogin" replace />;
  }

  return children;
};

export default ProtectedRouteStudents;
