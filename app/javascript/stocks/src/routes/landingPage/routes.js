import LandingPage from '../../components/landingPage/LandingPage';

import { getRoutePrefix, getRouteName } from './index';

const routePrefix = getRoutePrefix();

const routes = [
  {
    key: getRouteName('root'),
    path: `/${routePrefix}`,
    ComponentClass: LandingPage,
    componentProps: { id: routePrefix },
    href: `/${routePrefix}#${routePrefix}`,
    title: 'Landing Page',
    routeProps: { exact: true },
  }
];

export default routes;
