import { joinYearMonthDay, assertIsArray } from '../../../../lib/index';

import {
  groupStocksByErDate,
  getDefaultErDateAndKey
} from '../reducers/lib';

export default function stocksSuccess(action) {
  const { response, reducerOptions = {} } = action;
  assertIsArray(response);
  const { erDate, location } = reducerOptions;
  const groupedByErDate = groupStocksByErDate(response);

  const [defaultErDate, defaultGroupKey] = getDefaultErDateAndKey(groupedByErDate, location);

  const groupKey = erDate ? joinYearMonthDay(erDate, { isMoment: true }) : defaultGroupKey;

  return {
    response,
    groupedByErDate,
    defaultErDate,
    erDate,
    groupKey
  };
}
