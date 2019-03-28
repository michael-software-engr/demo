import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const configureStore = (preloadedState, rootReducer, middlewares) => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, ...middlewares),
);

export default configureStore;
