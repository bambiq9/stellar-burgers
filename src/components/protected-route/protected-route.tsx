import { useSelector } from '../../services/store';
import {
  selectIsAuthenticated,
  selectIsLoading
} from '../../services/user-slice';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../../components/ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const location = useLocation();

  if (isLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    console.log(from);
    return <Navigate replace to={from} />;
  }

  return children;
};
