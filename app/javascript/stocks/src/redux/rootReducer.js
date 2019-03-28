import { combineReducers } from 'redux';

import stocks from './modules/stocks/index';
import mobile from './modules/mobile/index';
import rrweRefactored from './modules/rrweRefactored/index';
// import reduxRealWorldExample from './modules/reduxRealWorldExample/index';

const rootReducer = combineReducers({
  [stocks.getKey()]: stocks.reducer,
  [mobile.getKey()]: mobile.reducer,
  [rrweRefactored.getKey()]: rrweRefactored.reducer,
  // [reduxRealWorldExample.getKey()]: reduxRealWorldExample.reducer
});

export default rootReducer;
