import { CALL_API } from '../../../middlewares/api';
import { callApi } from '../middleware';

import {
  STOCKS_REQUEST,
  STOCKS_SUCCESS,
  STOCKS_FAILURE,
  SET_ER_DATE,
  UPDATE_AFTER_LOCATION_UPDATE,
  SET_SORTED_STOCKS
} from './types';

function stocksEndpoint(queryParams) {
  if (!queryParams) {
    throw new Error('queryParams must be defined.');
  }

  const searchParams = new URLSearchParams();
  Object.keys(queryParams).forEach(key => searchParams.append(key, queryParams[key]));
  return ['stocks/by_year_month.json', searchParams.toString()].join('?');
}
function fetchStocks(queryParams, reducerOptions) {
  return {
    [CALL_API]: {
      types: [STOCKS_REQUEST, STOCKS_SUCCESS, STOCKS_FAILURE],
      endpoint: stocksEndpoint(queryParams),
      reducerOptions
    },
    callApi
  };
}
export function unconnectedLoadStocks(yearMonth, reducerOptions) {
  return function unconnectedLoadStocksDispatch(dispatch) {
    return dispatch(fetchStocks(yearMonth, reducerOptions));
  };
}

export function unconnectedSetErDate(payload) {
  return { type: SET_ER_DATE, payload };
}

export function unconnectedUpdateAfterLocationUpdate(payload) {
  return { type: UPDATE_AFTER_LOCATION_UPDATE, payload };
}

export function unconnectedSetSortedStocks(payload) {
  return { type: SET_SORTED_STOCKS, payload };
}
