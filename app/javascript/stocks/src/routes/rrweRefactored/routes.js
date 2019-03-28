import RRWEApp from '../../components/rrweRefactored/App';
import RRWEUserPage from '../../components/rrweRefactored/UserPage';
import RRWERepoPage from '../../components/rrweRefactored/RepoPage';

import { getRoutePrefix, getRouteName } from './index';

const routePrefix = getRoutePrefix();

export const rrweRefactoredDefaultRoute = {
  key: getRouteName('app'),
  path: `/${routePrefix}`,
  ComponentClass: RRWEApp,
  title: 'Redux Example'
};

const routes = [
  rrweRefactoredDefaultRoute,

  {
    key: getRouteName('user-page'),
    path: `/${routePrefix}/:login`,
    ComponentClass: RRWEUserPage,
    title: 'Redux Example - User Page',
    noMenu: true
  },

  {
    key: getRouteName('repo-page'),
    path: `/${routePrefix}/:login/:name`,
    ComponentClass: RRWERepoPage,
    title: 'Redux Example - Repo Page',
    noMenu: true
  }
];

export default routes;
