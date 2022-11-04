import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = ({ auth}) => {
    console.log(auth)
  return auth ? <Outlet /> : <Navigate to="/boilerbazaar" />;
};
export default ProtectedRoutes;
