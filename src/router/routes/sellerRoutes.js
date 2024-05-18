import { lazy } from 'react';

const Home = lazy(() => import('../../views/Home'));

export const sellerRoute = [
  {
    path: '/',
    element: <Home />,
    ability: ['admin', 'seller'],
  },
];
