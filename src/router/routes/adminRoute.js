import { lazy } from 'react';

const AdminDashboard = lazy(() => import('../../views/admin/AdminDashboard'));
const Orders = lazy(() => import('../../views/admin/Orders'));
const Category = lazy(() => import('../../views/admin/Category'));

export const adminRoute = [
  {
    path: 'admin/dashboard',
    element: <AdminDashboard />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/orders',
    element: <Orders />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/category',
    element: <Category />,
    role: 'admin',
  },
];
