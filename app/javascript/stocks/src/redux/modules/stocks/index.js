// TODO: WARNING! Don't import exports from this file from files inside this dir.
//   Put those exports inside './module' and import from that file instead.
import reducer from './reducers/index';
import module from './module';

import { joinYearMonthDay } from '../../../lib/index';

export const getModuleKey = module.getKey;

const defaultExports = {
  getKey: getModuleKey,
  reducer
};

export function erDateHasData({ erDate, stocksState }) {
  const { groupedByErDate } = stocksState;
  const groupKey = joinYearMonthDay(erDate, { isMoment: true });
  return groupedByErDate[groupKey];
}

export default defaultExports;
