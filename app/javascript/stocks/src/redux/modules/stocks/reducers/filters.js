// Preliminary logic
// If filter is not set, then display "Set Filter".
// If filter is set, operator and operand must be defined.

import { escapeRegExp } from '../../../../lib/index';

const initialState = {};
const key = 'filters';

const typeKeyCompanyName = 'companyName';
const typeKeySymbol = 'symbol';
const textFilterKeys = [typeKeyCompanyName, typeKeySymbol];

function numberFilter({ stocksList, filter }) {
  const { typeKey, operator } = filter;
  const operand = Number.parseFloat(filter.operand);

  if (!operator || !operator.toString().trim()
      || (operand !== 0 && !operand) || !operand.toString().trim()) {
    throw new Error('operator and operand must be defined.');
  }

  const filteredList = stocksList.filter((stock) => {
    const valueToBeFiltered = stock[typeKey];

    if (!valueToBeFiltered) return false;

    switch (operator) {
      case '>': {
        return valueToBeFiltered > operand;
      }

      case '>=': {
        return valueToBeFiltered >= operand;
      }

      case '<': {
        return valueToBeFiltered < operand;
      }

      case '<=': {
        return valueToBeFiltered <= operand;
      }

      default:
        throw new Error(`Invalid operator '${operator}'.`);
    }
  });

  return filteredList;
}

function textFilter({ stocksList, filter, typeKey }) {
  const { searchTerm } = filter;

  if (!searchTerm.toString().trim()) return stocksList;

  // Insert .* between letters so RegExp looks like:
  //   a.*b.*c
  const reStr = searchTerm.split('').map(char => escapeRegExp(char)).join('.*');

  const re = new RegExp(reStr, 'i');

  return stocksList.filter((stock) => {
    const valueToBeFiltered = stock[typeKey];

    if (!valueToBeFiltered) return false;

    return re.test(valueToBeFiltered);
  });
}

function buildFilterList({ state, typeKey, payload }) {
  const currentFilterList = state[key].list || [];

  const withoutSelectedTypeKey = currentFilterList.filter(filter => filter.typeKey !== typeKey);

  if (!payload) {
    return withoutSelectedTypeKey;
  }

  const newFilter = textFilterKeys.includes(typeKey) ? {
    typeKey, searchTerm: payload.searchTerm
  } : { typeKey, operator: payload.operator, operand: payload.operand };

  return withoutSelectedTypeKey.concat(newFilter);
}

function stocksFilter({ stocksList, filter }) {
  const { typeKey } = filter;
  return textFilterKeys.includes(typeKey)
    ? textFilter({ stocksList, filter, typeKey })
    : numberFilter({ stocksList, filter, typeKey });
}

function buildState({
  state, payload, typeKey, withSameErDate, currentListKey
}) {
  const list = buildFilterList({ state, typeKey, payload });

  const newCurrentList = list.reduce(
    (memo, filter) => stocksFilter({ stocksList: memo, filter }), withSameErDate
  );

  return {
    ...state,
    [currentListKey]: newCurrentList,
    [key]: { ...state[key], [typeKey]: payload, list }
  };
}

function reducerExpectedMove(args) {
  return buildState({ ...args, typeKey: 'expectedMove' });
}

function reducerPreviousMove(args) {
  return buildState({ ...args, typeKey: 'previousMove' });
}

function reducerMarketCap(args) {
  return buildState({ ...args, typeKey: 'marketCap' });
}

function reducerCompanyName(args) {
  return buildState({ ...args, typeKey: typeKeyCompanyName });
}

function reducerSymbol(args) {
  return buildState({ ...args, typeKey: typeKeySymbol });
}

export default {
  initialState: () => initialState,
  key: () => key,
  reducerExpectedMove,
  reducerPreviousMove,
  reducerMarketCap,
  reducerCompanyName,
  reducerSymbol
};
