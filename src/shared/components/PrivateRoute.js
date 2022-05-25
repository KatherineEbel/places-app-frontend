import {useContext} from "react";
import {AuthContext} from "../context/auth";
import {Navigate, useLocation} from "react-router-dom";

export default function PrivateRoute({ children, redirectPath = '/auth' }) {
  const { user } = useContext(AuthContext)
  const location = useLocation();

  if (!user) return <Navigate to={redirectPath} replace
    state={{ from: location }}
  />
  return children;
}