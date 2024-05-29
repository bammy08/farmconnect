import MainLayout from '../../layout/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import { privateRoutes } from './privateRoutes';

export const getRoute = () => {
  privateRoutes.map((r) => {
    r.element = <ProtectedRoute route={r}>{r.element}</ProtectedRoute>;
  });

  return {
    path: '/',
    element: <MainLayout />,
    children: privateRoutes,
  };
};
