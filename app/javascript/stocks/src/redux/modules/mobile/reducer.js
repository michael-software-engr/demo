import * as ActionTypes from './actions';

export default function reducer(state = {
  isMobile: false,
  singleColorMenuBar: true
}, action) {
  switch (action.type) {
    case ActionTypes.SET_MOBILE:
      return { isMobile: action.payload };

    default:
      return state;
  }
}
