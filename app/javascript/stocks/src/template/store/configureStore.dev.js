import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
/* eslint-disable import/no-extraneous-dependencies */
// import { createLogger } from 'redux-logger';
/* eslint-enable import/no-extraneous-dependencies */

import DevTools from '../containers/DevTools';

const configureStore = (preloadedState, rootReducer, middlewares) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(
        thunk,
        ...middlewares,
        // createLogger()
      ),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../../redux/rootReducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureStore;
