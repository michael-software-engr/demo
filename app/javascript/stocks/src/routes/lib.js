import assertUniqueness from './assertUniqueness';

const getValidRoute = (route) => {
  const { subRoutes } = route;

  const noSubRoutesProperties = subRoutes ? [] : ['ComponentClass'];

  const requiredProperties = ['key', 'path', 'title', ...noSubRoutesProperties];

  requiredProperties.forEach((key) => {
    if (!route[key]) {
      throw Error(
        `'${key}' property for route '${JSON.stringify(route)}' must be truthy.`
      );
    }
  });

  const validProperties = [
    ...requiredProperties,
    ...noSubRoutesProperties,
    'subRoutes',
    'componentProps',
    'routeProps',
    'redirect',
    'href',
    'noMenu',
    // 'icon'
  ].reduce((memo, key) => ({ ...memo, [key]: 1 }), {});

  Object.keys(route).forEach((key) => {
    if (!validProperties[key]) {
      throw Error(
        `'${key}' is not a valid property, valid properties: '${JSON.stringify(validProperties)}'.`
      );
    }
  });

  return route;
};

const getPropertyUtil = (name, obj) => {
  const property = obj[name];

  if (typeof property === 'undefined') throw Error(`Property '${name}' does not exist.`);

  return property;
};

const defaultExports = {
  getValidRoute,
  assertUniqueness,
  getPropertyUtil
};

export { getValidRoute, assertUniqueness, getPropertyUtil };
export default defaultExports;
