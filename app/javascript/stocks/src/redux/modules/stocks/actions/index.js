import { RESET_ERROR_MESSAGE } from './types';

export * from './types';

export {
  unconnectedLoadStocks,
  unconnectedSetErDate,
  unconnectedUpdateAfterLocationUpdate,
  unconnectedSetSortedStocks
} from './stocks';

export {
  unconnectedLoadTradingDays
} from './tradingDays';

export {
  unconnectedSetFilterExpectedMove,
  unconnectedSetFilterPreviousMove,
  unconnectedSetFilterMarketCap,
  unconnectedSetFilterCompanyName,
  unconnectedSetFilterSymbol
} from './filters';

// Resets the currently visible error message.
export function unconnectedResetErrorMessage() {
  return { type: RESET_ERROR_MESSAGE };
}
