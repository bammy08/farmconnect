import { lazy } from 'react';

const SellerDashboard = lazy(() =>
  import('../../views/seller/SellerDashboard')
);
const AddProduct = lazy(() => import('../../views/seller/AddProduct'));
const AllProducts = lazy(() => import('../../views/seller/AllProducts'));
const Discount = lazy(() => import('../../views/seller/Discount'));
const SellerOrders = lazy(() => import('../../views/seller/SellerOrders'));
const Payments = lazy(() => import('../../views/seller/Payments'));
const ChatCustomer = lazy(() => import('../../views/seller/ChatCustomer'));
const ChatAdmin = lazy(() => import('../../views/seller/ChatAdmin'));
const Profile = lazy(() => import('../../views/seller/Profile'));
const EditProduct = lazy(() => import('../../views/seller/EditProduct'));
const OrderDetails = lazy(() => import('../../views/seller/OrderDetails'));
const Pending = lazy(() => import('../../views/Pending'));
const Deactivate = lazy(() => import('../../views/Deactivate'));

export const sellerRoute = [
  {
    path: '/seller/account-pending',
    element: <Pending />,
    ability: 'seller',
  },
  {
    path: '/seller/account-deactivate',
    element: <Deactivate />,
    ability: 'seller',
  },
  {
    path: '/seller/dashboard',
    element: <SellerDashboard />,
    role: 'seller',
    status: 'active',
  },
  {
    path: '/seller/dashboard/add-product',
    element: <AddProduct />,
    role: 'seller',
    status: 'active',
  },
  {
    path: '/seller/dashboard/edit-product/:productId',
    element: <EditProduct />,
    role: 'seller',
    status: 'active',
  },
  {
    path: '/seller/dashboard/all-product',
    element: <AllProducts />,
    role: 'seller',
    status: 'active',
  },
  {
    path: '/seller/dashboard/discount',
    element: <Discount />,
    role: 'seller',
    status: 'active',
  },
  {
    path: '/seller/dashboard/orders',
    element: <SellerOrders />,
    role: 'seller',
    visibility: ['active', 'inactive'],
  },
  {
    path: '/seller/dashboard/orders/details/:orderId',
    element: <OrderDetails />,
    role: 'seller',
    visibility: ['active', 'inactive'],
  },

  {
    path: '/seller/dashboard/payment',
    element: <Payments />,
    role: 'seller',
    status: 'active',
  },
  {
    path: '/seller/dashboard/chat-customer',
    element: <ChatCustomer />,
    role: 'seller',
    status: 'active',
  },
  {
    path: '/seller/dashboard/chat-customer/:customerId',
    element: <ChatCustomer />,
    role: 'seller',
    status: 'active',
  },
  {
    path: '/seller/dashboard/chat-support',
    element: <ChatAdmin />,
    role: 'seller',
    visibility: ['active', 'inactive', 'pending'],
  },
  {
    path: '/seller/dashboard/profile',
    element: <Profile />,
    role: 'seller',
    status: 'active',
  },
];
