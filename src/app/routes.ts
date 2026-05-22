import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Story from './pages/Story';
import Menu from './pages/Menu';
import Subscription from './pages/Subscription';
import Franchise from './pages/Franchise';
import Career from './pages/Career';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'story', Component: Story },
      { path: 'menu', Component: Menu },
      { path: 'subscription', Component: Subscription },
      { path: 'franchise', Component: Franchise },
      { path: 'career', Component: Career },
      { path: 'dashboard', Component: Dashboard },
      { path: '*', Component: Home },
    ],
  },
]);
