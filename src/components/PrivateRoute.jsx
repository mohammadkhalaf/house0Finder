import { Navigate, Outlet } from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus';

const PrivateRoute = () => {
  const { loggedIn, checkStatus } = useAuthStatus();
  if (checkStatus) {
    return <h4>loading</h4>;
  }

  return loggedIn ? <Outlet /> : <Navigate to='/signin' />;
};

export default PrivateRoute;
