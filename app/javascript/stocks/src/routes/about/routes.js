import Placeholder from '../../components/app/Placeholder';

import { getRoutePrefix, getRouteName } from './index';

const routePrefix = getRoutePrefix();

const routes = [
  ['sitemap', 'Sitemap'],
  ['legal', 'Legal'],
  ['privacy-policy', 'Privacy Policy'],
  ['contact-us', 'Contact Us']
].map(([path, title]) => ({
  key: getRouteName(path),
  path: `/${routePrefix}/${path}`,
  ComponentClass: Placeholder,
  componentProps: { title, id: path },
  title,

  href: `/${routePrefix}/${path}#${path}`
}));

export default routes;
