import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
/* eslint-enable import/no-extraneous-dependencies */
import { Provider } from 'react-redux';

import DevTools from './DevTools';

const Root = ({ store, App }) => (
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape().isRequired,
  App: PropTypes.func.isRequired
};

export default Root;
