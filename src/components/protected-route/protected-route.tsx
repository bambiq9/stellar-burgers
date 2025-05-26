import { useSelector } from '../../services/store';
import {
  selectIsAuthenticated,
  selectIsLoading
} from '../../services/user-slice';
import { Navigate } from 'react-router-dom';
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

  if (isLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to='/login' />;
  }

  if (onlyUnAuth && isAuthenticated) {
    return <Navigate replace to='/' />;
  }

  return children;
};
