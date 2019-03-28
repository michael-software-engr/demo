import RRWEApp from '../../components/reduxRealWorldExample/App';
import RRWEUserPage from '../../components/reduxRealWorldExample/UserPage';
import RRWERepoPage from '../../components/reduxRealWorldExample/RepoPage';

import { getRoutePrefix, getRouteName } from './index';

const routePrefix = getRoutePrefix();

// TODO: hack because no prefix.
const prefix = routePrefix === '' ? '' : `/${routePrefix}`;

const routes = [
  {
    key: getRouteName('app'),
    path: '/',
    ComponentClass: RRWEApp,
    title: 'Home',

    // icon: 'github'
  },

  {
    key: getRouteName('user-page'),
    path: `${prefix}/:login`,
    ComponentClass: RRWEUserPage,
    title: 'Redux Example - User Page',

    // url: `${prefix}/:login`,
    // icon: 'github'
  },

  {
    key: getRouteName('repo-page'),
    path: `${prefix}/:login/:name`,
    ComponentClass: RRWERepoPage,
    title: 'Redux Example - Repo Page',


    // url: `${prefix}/:login/:name`,
    // noUrl: true,
    // icon: 'github'
  }
];

export default routes;
