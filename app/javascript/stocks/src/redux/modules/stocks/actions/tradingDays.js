import { CALL_API } from '../../../middlewares/api';
import { callApi } from '../middleware';

import { assertIsArray } from '../../../../lib/index';

import {
  TRADING_DAYS_REQUEST,
  TRADING_DAYS_SUCCESS,
  TRADING_DAYS_FAILURE
} from './types';

function tradingDaysEndpoint(years) {
  assertIsArray(years);
  const queryParams = { years };
  const searchParams = new URLSearchParams();
  Object.keys(queryParams).forEach(key => searchParams.append(key, queryParams[key]));
  return ['trading_days/by_years.json', searchParams.toString()].join('?');
}
function fetchTradingDays(years) {
  return {
    [CALL_API]: {
      types: [TRADING_DAYS_REQUEST, TRADING_DAYS_SUCCESS, TRADING_DAYS_FAILURE],
      endpoint: tradingDaysEndpoint(years)
    },
    callApi
  };
}
export function unconnectedLoadTradingDays(years) { /* eslint-disable-line import/prefer-default-export, max-len */
  return function unconnectedLoadTradingDaysDispatch(dispatch) {
    return dispatch(fetchTradingDays(years));
  };
}
