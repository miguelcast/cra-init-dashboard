import asyncComponent from './components/AsyncComponent';
import Home from './pages/Home';
import { nextNumber } from './utils/general';

const nextRouteIndex = nextNumber();

const createRoute = (url, component, exact = false) => ({
  index: nextRouteIndex(),
  path: url,
  component,
  exact,
});

export default [
  createRoute('/', Home, true),
  createRoute(
    '/home',
    asyncComponent(() =>
      import('./pages/Home.js').then(module => module.default),
    ),
  ),
];
