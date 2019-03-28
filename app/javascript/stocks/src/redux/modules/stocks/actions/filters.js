
import {
  SET_FILTER_EXPECTED_MOVE,
  SET_FILTER_PREVIOUS_MOVE,
  SET_FILTER_MARKET_CAP,
  SET_FILTER_COMPANY_NAME,
  SET_FILTER_SYMBOL
} from './types';

export function unconnectedSetFilterMarketCap(payload) {
  return { type: SET_FILTER_MARKET_CAP, payload };
}

export function unconnectedSetFilterPreviousMove(payload) {
  return { type: SET_FILTER_PREVIOUS_MOVE, payload };
}

export function unconnectedSetFilterExpectedMove(payload) {
  return { type: SET_FILTER_EXPECTED_MOVE, payload };
}

export function unconnectedSetFilterCompanyName(payload) {
  return { type: SET_FILTER_COMPANY_NAME, payload };
}

export function unconnectedSetFilterSymbol(payload) {
  return { type: SET_FILTER_SYMBOL, payload };
}
