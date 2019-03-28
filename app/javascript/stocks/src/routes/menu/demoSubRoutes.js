import stocksRoutes from '../stocks/routes';
// import rrweRefactoredRoutes from '../rrweRefactored/routes';
// import reduxRealWorldExampleRoutes from './reduxRealWorldExample/routes';

import landingPageRoutes from '../landingPage/routes';

// // httpbin.org
// import HTTPBinDotOrg from '../containers/apps/httpbin.org/HTTPBinDotOrg';

import { getValidRoute, assertUniqueness } from '../lib';

const routes = assertUniqueness(
  [
    ...stocksRoutes,
    // ...rrweRefactoredRoutes,
    // ...reduxRealWorldExampleRoutes,

    ...landingPageRoutes

    // // httpbin.org
    // httpbinDotOrg: {
    //   path: '/httpbin.org',
    //   text: 'httpbin.org',

    //   ComponentClass: HTTPBinDotOrg,
    //   icon: 'settings'
    // }
  ].map(route => getValidRoute(route))
);

export default routes;
