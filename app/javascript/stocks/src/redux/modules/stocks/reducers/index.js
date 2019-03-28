import moment from 'moment';

import * as ActionTypes from '../actions/types';
import { joinYearMonthDay, assertIsArray } from '../../../../lib/index';
import {
  tradingDaysByErDateReduceCb,
  erDateFromQueryParams
} from './lib';
import filters from './filters';
import stocksSuccess from '../lib/stocksSuccess';

const currentListKey = 'currentList';

const initialState = {
  isFetching: false,
  errorMessage: null,

  list: [],
  groupedByErDate: {},
  defaultErDate: null,
  withSameErDate: null,
  [currentListKey]: null,
  erDate: null,

  tradingDays: [],
  tradingDaysByErDate: {},

  [filters.key()]: filters.initialState()
};

export default function stocksReducerNew(state = initialState, action) {
  const { type, payload, error } = action;

  if (error) {
    return { ...state, errorMessage: error };
  }

  const { currentList, withSameErDate } = state;

  const filterReducerArguments = {
    state,
    payload,
    withSameErDate,
    currentListKey
  };

  switch (type) {
    // Main stocks: START
    case ActionTypes.STOCKS_REQUEST: {
      return { ...state, isFetching: true };
    }

    case ActionTypes.STOCKS_SUCCESS: {
      const {
        response,
        groupedByErDate,
        defaultErDate,
        erDate,
        groupKey
      } = stocksSuccess(action);

      return {
        ...state,
        isFetching: false,
        list: response,
        groupedByErDate,
        defaultErDate,
        erDate,
        withSameErDate: groupedByErDate[groupKey]
      };
    }

    case ActionTypes.STOCKS_FAILURE: {
      return { ...state, isFetching: false };
    }

    case ActionTypes.SET_ER_DATE: {
      const { groupedByErDate } = state;
      const erDate = payload;
      const groupKey = joinYearMonthDay(erDate, { isMoment: true });
      return {
        ...state,
        erDate,
        withSameErDate: groupedByErDate[groupKey]
      };
    }

    case ActionTypes.UPDATE_AFTER_LOCATION_UPDATE: {
      const { prevLocation, currentLocation } = payload;
      if (!prevLocation || !currentLocation) {
        throw new Error('prevLocation and currentLocation must be defined.');
      }

      const erDateFromPrev = erDateFromQueryParams(prevLocation);
      const erDateFromCurrent = erDateFromQueryParams(currentLocation);

      // If there is no date params in the address bar.
      if (!erDateFromCurrent) {
        return state;
      }

      if (moment(erDateFromPrev).isSame(erDateFromCurrent)) {
        return state;
      }

      const { groupedByErDate } = state;
      const groupKey = joinYearMonthDay(erDateFromCurrent, { isMoment: true });
      return {
        ...state,
        erDate: erDateFromCurrent,
        withSameErDate: groupedByErDate[groupKey]
      };
    }

    // For sorting columns.
    case ActionTypes.SET_SORTED_STOCKS: {
      return {
        ...state,
        ...(currentList ? { [currentListKey]: payload } : { withSameErDate: payload })
      };
    }
    // Main stocks: END

    // Trading days: START
    case ActionTypes.TRADING_DAYS_REQUEST: {
      return { ...state, isFetching: true };
    }

    case ActionTypes.TRADING_DAYS_SUCCESS: {
      const { response } = action;
      assertIsArray(response);
      return {
        ...state,
        isFetching: false,
        tradingDays: response,
        tradingDaysByErDate: response.reduce(tradingDaysByErDateReduceCb, {})
      };
    }

    case ActionTypes.TRADING_DAYS_FAILURE: {
      return { ...state, isFetching: false };
    }
    // Trading days: END

    // Filters: START
    case ActionTypes.SET_FILTER_EXPECTED_MOVE: {
      return filters.reducerExpectedMove(filterReducerArguments);
    }

    case ActionTypes.SET_FILTER_PREVIOUS_MOVE: {
      return filters.reducerPreviousMove(filterReducerArguments);
    }

    case ActionTypes.SET_FILTER_MARKET_CAP: {
      return filters.reducerMarketCap(filterReducerArguments);
    }

    case ActionTypes.SET_FILTER_COMPANY_NAME: {
      return filters.reducerCompanyName(filterReducerArguments);
    }

    case ActionTypes.SET_FILTER_SYMBOL: {
      return filters.reducerSymbol(filterReducerArguments);
    }
    // Filters: END

    case ActionTypes.RESET_ERROR_MESSAGE: {
      return { ...state, errorMessage: null };
    }

    default:
      return state;
  }
}
