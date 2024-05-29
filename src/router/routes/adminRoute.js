import { lazy } from 'react';

const AdminDashboard = lazy(() => import('../../views/admin/AdminDashboard'));
const Orders = lazy(() => import('../../views/admin/Orders'));
const Category = lazy(() => import('../../views/admin/Category'));
const Seller = lazy(() => import('../../views/admin/Seller'));
const PaymentRequest = lazy(() => import('../../views/admin/PaymentRequest'));
const DeactivateSeller = lazy(() =>
  import('../../views/admin/DeactivateSeller')
);
const SellerRequest = lazy(() => import('../../views/admin/SellerRequest'));
const SellerDetails = lazy(() => import('../../views/admin/SellerDetails'));
const ChatSeller = lazy(() => import('../../views/admin/ChatSeller'));
const OrderDetails = lazy(() => import('../../views/admin/OrderDetails'));

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
  {
    path: 'admin/dashboard/sellers',
    element: <Seller />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/payment-request',
    element: <PaymentRequest />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/deactivate-sellers',
    element: <DeactivateSeller />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/seller-request',
    element: <SellerRequest />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/seller-details/:sellerId',
    element: <SellerDetails />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/seller-chat',
    element: <ChatSeller />,
    role: 'admin',
  },
  {
    path: 'admin/dashboard/order-details/:orderId',
    element: <OrderDetails />,
    role: 'admin',
  },
];
