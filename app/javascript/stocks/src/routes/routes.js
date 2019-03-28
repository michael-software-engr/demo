import menuRoutes from './menu/routes';
// import menuRoutes, { menuDefaultRoute } from './menu/routes';
import { stocksRoutesByName } from './stocks/routes';
import demoSubRoutes from './menu/demoSubRoutes';

import aboutRoutes from './about/routes';
import productsAndServicesRoutes from './productsAndServices/routes';

import { getValidRoute, assertUniqueness } from './lib';

const rootRouteKey = 'root';

const stocksRouteRoot = stocksRoutesByName['stocks-root'];

const rootRoute = {
  ...stocksRouteRoot,
  key: rootRouteKey,
  path: '/',
  routeProps: { exact: true },
  redirect: `${stocksRouteRoot.path}#stocks?date=2019-03-07`

  // ...menuDefaultRoute,
  // key: rootRouteKey,
  // path: '/',
  // routeProps: { exact: true },
  // redirect: menuDefaultRoute.path
};

const routes = assertUniqueness(
  [
    rootRoute,
    ...menuRoutes,
    ...demoSubRoutes,

    ...aboutRoutes,
    ...productsAndServicesRoutes
  ].map(route => getValidRoute(route)),

  { rootRouteIsNotUnique: true, rootRouteKey }
);

const routesByName = (
  routes.reduce((memo, route) => ({
    ...memo,
    [route.key]: route
  }), {})
);

export const getRouteByKey = (key) => {
  const route = routesByName[key];

  if (!route) {
    throw Error(`No route with key '${key}'.`);
  }

  return route;
};

export default routes;
