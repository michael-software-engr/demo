import Placeholder from '../../components/app/Placeholder';

import demoSubRoutes from './demoSubRoutes';

import { getRoutePrefix, getRouteName } from './index';

const routePrefix = getRoutePrefix();

// TODO: hack because no prefix.
const prefix = routePrefix === '' ? '' : `/${routePrefix}`;

export const menuDefaultRoute = {
  key: getRouteName('home'),
  path: `${prefix}/home`,
  ComponentClass: Placeholder,
  componentProps: { title: 'Home', id: 'home' },
  title: 'Home',
  href: `${prefix}/home#home`
};

const routes = [
  menuDefaultRoute,

  {
    key: getRouteName('demos'),
    path: `${prefix}/demos`,
    subRoutes: demoSubRoutes,
    title: 'Demos'
  },

  // {
  //   key: getRouteName('resume'),
  //   path: `${prefix}/resume`,
  //   ComponentClass: Placeholder,
  //   componentProps: { title: 'Resume' },
  //   title: 'Resume'
  // },

  {
    key: getRouteName('contact'),
    path: `${prefix}/contact`,
    ComponentClass: Placeholder,
    componentProps: { title: 'Contact', id: 'contact' },
    title: 'Contact',
    href: `${prefix}/contact#contact`
  }
];

export default routes;
