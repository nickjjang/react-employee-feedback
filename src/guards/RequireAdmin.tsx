import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../app/store";

const RequireAdmin = () => {
  const location = useLocation();

  const authAdmin = useSelector((state: RootState) => state.authAdmin);
  // return <Outlet />;
  return authAdmin && authAdmin.authAdmin?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} replace />
  );
};

export default RequireAdmin;
