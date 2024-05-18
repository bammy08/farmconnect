import { adminRoute } from './adminRoute';
import { sellerRoute } from './sellerRoutes';

export const privateRoutes = [...adminRoute, ...sellerRoute];
