import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = ({auth}) => {
    return (auth ? <Outlet /> : <Navigate to="/boilerbazaar"/>)
}
export default ProtectedRoutes;