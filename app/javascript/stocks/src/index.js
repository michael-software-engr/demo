import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import App from './components/app/App';

import middlewares from './redux/middlewares';
import rootReducer from './redux/rootReducer';

import configureStore from './template/store/configureStore';
import Root from './template/containers/Root';

import * as serviceWorker from './template/serviceWorker';

const store = configureStore({}, rootReducer, middlewares);

render(
  <Router>
    <Root store={store} App={App} />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
