import { useState } from 'react';
import Router from './router/Router';
import publicRoutes from './router/routes/publicRoutes';

const App = () => {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  return <Router allRoutes={allRoutes} />;
};

export default App;
