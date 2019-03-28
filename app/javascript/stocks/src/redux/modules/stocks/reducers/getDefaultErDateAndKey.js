import queryString from 'query-string';

import {
  momentify,
  joinYearMonthDay,
  dateJoinerStrQueryParams,
  ymd
} from '../../../../lib/index';

import { QUERY_PARAM_DATE } from '../module';

function getInputDateStr({ search, hash }) {
  const parsedFromSearch = queryString.parse(search);
  const inputDateStr = parsedFromSearch[QUERY_PARAM_DATE];

  if (inputDateStr) return inputDateStr;

  if (!hash) return null;

  const qpFromHash = hash.replace(/^#.+?[?]/, '');
  const parsedFromHash = queryString.parse(qpFromHash);

  return parsedFromHash[QUERY_PARAM_DATE];
}

export function erDateFromQueryParams(location) {
  const { search, hash } = location;
  const inputDateStr = getInputDateStr({ search, hash });

  if (!inputDateStr) return null;

  // Input date str is expected to be YYYY-MM-DD
  const dateMoment = momentify(inputDateStr, { isParam: true });

  if (dateMoment.isValid()) return dateMoment;

  const momentFormat = ymd.join(dateJoinerStrQueryParams);
  console.warn( // eslint-disable-line no-console
    `Invalid date from location '${search}' or '${hash}', must be of format '${momentFormat}'.`
  );

  return null;
}

function erDateFromNextErFromCurrentDate(stocksGroupedByErDate) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  let day = date.getDate();

  const lastDateOfMonth = new Date(year, month, 0);
  const lastDayOfMonth = lastDateOfMonth.getDate();

  let dateKey;
  for (day; day <= lastDayOfMonth; day += 1) {
    dateKey = joinYearMonthDay({ year, month, day });

    if (stocksGroupedByErDate[dateKey]) {
      return momentify({ year, month, day });
    }
  }

  return null;
}

export function getDefaultErDateAndKey(stocksGroupedByErDate, location) {
  const fromQueryParams = erDateFromQueryParams(location);

  const defaultErDateMoment = fromQueryParams
    || erDateFromNextErFromCurrentDate(stocksGroupedByErDate);

  if (!defaultErDateMoment) return [];

  const dateKey = joinYearMonthDay(defaultErDateMoment, { isMoment: true });

  return [
    defaultErDateMoment,
    dateKey
  ];
}

export default getDefaultErDateAndKey;
