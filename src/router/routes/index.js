import MainLayout from '../../layout/MainLayout';
import { privateRoutes } from './privateRoutes';

export const getRoute = () => {
  return {
    path: '/',
    element: <MainLayout />,
    children: privateRoutes,
  };
};
