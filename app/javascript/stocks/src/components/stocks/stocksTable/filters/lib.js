export const arithmeticOperatorOptions = [
  { key: 'greaterThanOrEqualTo', value: '>=' },
  { key: 'greaterThan', value: '>' },
  { key: 'lessThanOrEqualTo', value: '<=' },
  { key: 'lessThan', value: '<' }
].map(({ value, ...oper }) => ({ ...oper, value, text: value }));

export const numberSuffixOptions = [
  { key: 'billion', value: 'B', multiplier: 1000000000 },
  { key: 'million', value: 'M', multiplier: 1000000 },
  { key: 'thousand', value: 'K', multiplier: 1000 },
  {
    key: 'none', value: null, multiplier: 1, text: 'None'
  }
].map(({ value, ...option }) => ({ ...option, value, text: option.text || value }));

export const numberSuffixOptionsByValue = numberSuffixOptions.reduce(
  (memo, { value, ...option }) => ({ ...memo, [value]: { ...option, value } }),
  {}
);

export const initialState = {
  showFilter: false,
  localStateOperator: arithmeticOperatorOptions[0].value,
  localStateOperand: null
};

export const isFloat = value => (/^-?\d*[.]?\d*$/.test(value));

export const mustEnterFloatMessage = 'Must enter numbers only.';

export const filterClassName = 'App--Stocks--StocksTable--Filter';
