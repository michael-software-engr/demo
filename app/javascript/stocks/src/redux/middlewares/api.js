// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'MIDDLEWARES_CALL_API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { reducerOptions } = callAPI;
  let { endpoint } = callAPI;
  const { schema, types } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  // ... get rid of this because in general, not all calls will have schemas.
  // if (!schema) {
  //   throw new Error('Specify one of the exported Schemas.');
  // }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return action.callApi(endpoint, schema).then(
    response => next(actionWith({
      response,
      type: successType,
      reducerOptions
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  );
};
