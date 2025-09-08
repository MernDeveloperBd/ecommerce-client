// RoleRoute.jsx
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { MyContext } from '../../App';


const RoleRoute = ({ allowed = [], children }) => {
  const { isLogin, userData } = useContext(MyContext);
  const location = useLocation();

  if (!isLogin) {
    return <Navigate to="/login" state={{ redirectTo: location.pathname }} replace />;
  }

  const role = String(userData?.role || '').toLowerCase();
  const can = allowed.map(r => r.toLowerCase());
  if (can.includes(role) || userData?.isAdmin === true) return children;

  return <Navigate to="/" replace />;
};

export default RoleRoute;