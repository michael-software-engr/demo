
import { joinYearMonthDay } from '../../../../lib/index';

function groupStocksByErDateCb(memo, stock) {
  const key = joinYearMonthDay(stock.tradingDay);
  const stocksInSameGroup = memo[key] || [];
  return { ...memo, [key]: [...stocksInSameGroup, stock] };
}

export function groupStocksByErDate(stocks) {
  return stocks.reduce(groupStocksByErDateCb, {});
}

export function tradingDaysByErDateReduceCb(memo, tradingDay) {
  const key = joinYearMonthDay(tradingDay);
  return { ...memo, [key]: tradingDay };
}
