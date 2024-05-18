import { MdDashboard, MdOutlineChat, MdOutlinePayments } from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { FaCodePullRequest } from 'react-icons/fa6';
import { FaUserTimes, FaUsers } from 'react-icons/fa';

export const allNav = [
  {
    id: 1,
    title: 'Dashboard',
    icon: <MdDashboard />,
    role: 'admin',
    path: '/admin/dashboard',
  },
  {
    id: 2,
    title: 'Orders',
    icon: <AiOutlineShoppingCart />,
    role: 'admin',
    path: '/admin/dashboard/orders',
  },
  {
    id: 3,
    title: 'Category',
    icon: <BiCategory />,
    role: 'admin',
    path: '/admin/dashboard/category',
  },
  {
    id: 4,
    title: 'Sellers',
    icon: <FaUsers />,
    role: 'admin',
    path: '/admin/dashboard/sellers',
  },
  {
    id: 5,
    title: 'Payment Request',
    icon: <MdOutlinePayments />,
    role: 'admin',
    path: '/admin/dashboard/payment-request',
  },
  {
    id: 6,
    title: 'Deactivate Sellers',
    icon: <FaUserTimes />,
    role: 'admin',
    path: '/admin/dashboard/deactivate-sellers',
  },
  {
    id: 7,
    title: 'Seller Request',
    icon: <FaCodePullRequest />,
    role: 'admin',
    path: '/admin/dashboard/seller-request',
  },
  {
    id: 8,
    title: 'Live Chat',
    icon: <MdOutlineChat />,
    role: 'admin',
    path: '/admin/dashboard/live-chat',
  },
];
