import { MdDashboard, MdOutlineChat, MdOutlinePayments } from 'react-icons/md';
import { AiOutlineProduct, AiOutlineShoppingCart } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { FaCodePullRequest, FaUser } from 'react-icons/fa6';
import { FaUserTimes, FaUsers } from 'react-icons/fa';
import { IoAddCircle } from 'react-icons/io5';
import { CiDiscount1 } from 'react-icons/ci';
import { IoChatbubbleEllipses } from 'react-icons/io5';

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
    path: '/admin/dashboard/seller-chat',
  },

  // seller routes

  {
    id: 9,
    title: 'Dashboard',
    icon: <MdDashboard />,
    role: 'seller',
    path: '/seller/dashboard',
  },
  {
    id: 10,
    title: 'Add Product',
    icon: <IoAddCircle />,
    role: 'seller',
    path: '/seller/dashboard/add-product',
  },
  {
    id: 11,
    title: 'All Product',
    icon: <AiOutlineProduct />,
    role: 'seller',
    path: '/seller/dashboard/all-product',
  },
  {
    id: 12,
    title: 'Discount Product',
    icon: <CiDiscount1 />,
    role: 'seller',
    path: '/seller/dashboard/discount',
  },
  {
    id: 13,
    title: 'Orders',
    icon: <AiOutlineShoppingCart />,
    role: 'seller',
    path: '/seller/dashboard/orders',
  },
  {
    id: 14,
    title: 'Payment',
    icon: <MdOutlinePayments />,
    role: 'seller',
    path: '/seller/dashboard/payment',
  },
  {
    id: 15,
    title: 'Chat Customer',
    icon: <MdOutlineChat />,
    role: 'seller',
    path: '/seller/dashboard/chat-customer',
  },
  {
    id: 16,
    title: 'Chat Support',
    icon: <IoChatbubbleEllipses />,
    role: 'seller',
    path: '/seller/dashboard/chat-support',
  },
  {
    id: 17,
    title: 'Profile',
    icon: <FaUser />,
    role: 'seller',
    path: '/seller/dashboard/profile',
  },
];
