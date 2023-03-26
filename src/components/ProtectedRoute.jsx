import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const ProtectedRoute = ({ children }) => {
  const [cookies] = useCookies(["access_token"]);
  const isAuth = cookies.access_token ? true : false;

  if (isAuth) {
    return children;
  } else {
    return <Navigate to="/auth" replace />;
  }
};
