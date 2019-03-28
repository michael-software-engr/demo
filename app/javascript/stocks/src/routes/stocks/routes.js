import Stocks from '../../components/stocks/Stocks';

import { getRoutePrefix, getRouteName } from './index';

const routePrefix = getRoutePrefix();

const routes = [
  {
    key: getRouteName('root'),
    path: `/${routePrefix}`,
    ComponentClass: Stocks,
    componentProps: { id: routePrefix },
    href: `/${routePrefix}#${routePrefix}`,
    title: 'Stocks Table',
    routeProps: { exact: true },
  }
];

const stocksRoutesByName = (
  routes.reduce((memo, route) => ({
    ...memo,
    [route.key]: route
  }), {})
);

export { stocksRoutesByName };
export default routes;
