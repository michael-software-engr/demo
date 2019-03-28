import Placeholder from '../../components/app/Placeholder';

import { getRoutePrefix, getRouteName } from './index';

const routePrefix = getRoutePrefix();

const routes = [
  ['training', 'Training'],
  ['pricing', 'Pricing'],
  ['api', 'API'],
  ['how-to-access', 'How to Access'],
  ['faq', 'FAQ']
].map(([path, title]) => ({
  key: getRouteName(path),
  path: `/${routePrefix}/${path}`,
  ComponentClass: Placeholder,
  componentProps: { title, id: path },
  title,

  href: `/${routePrefix}/${path}#${path}`
}));

export default routes;
