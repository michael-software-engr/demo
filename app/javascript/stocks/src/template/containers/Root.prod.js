import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
/* eslint-enable import/no-extraneous-dependencies */
import { Provider } from 'react-redux';

const Root = ({ store, App }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape().isRequired,
  App: PropTypes.func.isRequired
};
export default Root;
