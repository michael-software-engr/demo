const checkRoutesByProperty = (propertyName, routes) => {
  const routesByProperty = routes.reduce((memo, route) => {
    const propertyValue = route[propertyName];
    return {
      ...memo, [propertyValue]: memo[propertyValue] ? memo[propertyValue] + 1 : 1
    };
  }, {});

  Object.keys(routesByProperty).forEach((property) => {
    if (routesByProperty[property] > 1) {
      console.error(
        `Property '${propertyName}' value '${property}' has a duplicate. '${propertyName}' must be unique. The routes...\n`,
        routes
      );
      throw Error('...');
    }
  });
};

const assertUniqueness = (
  routes,
  // options = {}
) => {
  checkRoutesByProperty('key', routes);
  checkRoutesByProperty('path', routes);

  // const { rootRouteIsNotUnique, rootRouteKey } = options;
  // const filteredRoutes = rootRouteIsNotUnique
  //   ? routes.filter(({ key }) => rootRouteKey !== key)
  //   : routes;
  // checkRoutesByProperty('title', filteredRoutes);

  return routes;
};

export default assertUniqueness;
