import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'semantic-ui-react';

import classNames from 'classnames';

import SymbolFilter from './SymbolFilter';
import CompanyName from './CompanyName';
import ExpectedMove from './ExpectedMove';
import PreviousMove from './PreviousMove';
import MarketCap from './MarketCap';

import columnMetaData from '../columnMetaData';

import '../../../../css/components/stocks/stocksTable/index.css';

const filterComponents = {
  symbol: SymbolFilter,
  companyName: CompanyName,
  expectedMove: ExpectedMove,
  previousMove: PreviousMove,
  marketCap: MarketCap
};

const Filters = ({ tableHeaderClass, defaultCursorClass }) => (
  columnMetaData.map(({
    columnName, width, longTitle, shortTitle
  }) => {
    const FilterComponent = filterComponents[columnName];

    return (
      <Table.HeaderCell
        key={columnName}
        textAlign="center"

        width={width}
        className={classNames(tableHeaderClass, { [defaultCursorClass]: !FilterComponent })}
      >
        {
          FilterComponent && (
            <FilterComponent
              columnName={columnName}
              title={longTitle || shortTitle}
            />
          )
        }
      </Table.HeaderCell>
    );
  })
);

Filters.propTypes = {
  // Injected by ancestor component.
  tableHeaderClass: PropTypes.string.isRequired,
  defaultCursorClass: PropTypes.string.isRequired
};

export default Filters;
