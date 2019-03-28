// ... do not name this as "Routes". There is another module named "routes".
//   React will issue a warning about having similarly named modules differing only in case.

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import ResponsiveContainer from './ResponsiveContainer';

import routes from '../../routes/routes';

const App = () => (
  <ResponsiveContainer>
    {
      routes.map(({
        key, path, routeProps, ComponentClass, componentProps, redirect
      }) => (
        <Route
          key={key}
          path={path}
          {...routeProps}
          render={props => (
            redirect ? (
              <Redirect to={redirect} />
            ) : (
              // TODO: { ...props} {...componentProps} => check for duplicates?
              <ComponentClass {...props} {...componentProps} />
            )
          )}
        />
      ))
    }
  </ResponsiveContainer>
);

export default App;
