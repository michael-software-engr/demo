import moment from 'moment';

export const escapeRegExp = string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string

const dateJoinerStr = '/';
export const dateJoinerStrQueryParams = '-';

export const ymd = ['YYYY', 'MM', 'DD'];

export const joinYearMonthDay = (date, { isMoment, isParam } = {}) => {
  const joinerStr = isParam ? dateJoinerStrQueryParams : dateJoinerStr;

  const dateFormat = ymd.join(joinerStr);

  if (isMoment) {
    return date.format(dateFormat);
  }

  const { year, month, day } = date;
  // Kind of round about way but this ensures zero padded single digit months and days.
  return moment([year, month, day].join(joinerStr), dateFormat).format(dateFormat);
};

export const assertIsArray = (obj) => {
  if (!obj) {
    throw new Error('obj must be defined.');
  }

  if (!Array.isArray(obj)) {
    const json = JSON.stringify(obj);
    throw new Error(`obj must be an array...\n${json}`);
  }
};

export const momentify = (dateInput, { isParam = false } = {}) => {
  const joinerStr = isParam ? dateJoinerStrQueryParams : dateJoinerStr;

  if (typeof dateInput === 'object') {
    const { year, month, day } = dateInput;

    [['year', year], ['month', month], ['day', day]].forEach(([key, value]) => {
      if (!value || typeof value !== 'number') {
        throw new Error(`Invalid '${key}' value '${value}'.`);
      }
    });

    return moment(
      [year, month, day].join(joinerStr),
      ymd.join(joinerStr)
    );
  }

  if (typeof dateInput === 'string') {
    return moment(dateInput, ymd.join(joinerStr));
  }

  throw new Error(`Invalid date input '${JSON.stringify(dateInput)}'.`);
};
