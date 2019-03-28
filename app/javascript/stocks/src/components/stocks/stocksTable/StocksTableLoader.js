import React from 'react';
import PropTypes from 'prop-types';

import {
  Segment,
  Message,
  Placeholder
} from 'semantic-ui-react';

import StocksTable from './StocksTable';

const placeholderLines = Array.from(Array(10).keys());

const StocksTableLoader = ({
  handleClickStocksTableColumn,
  withSameErDate,
  stocksTableColumn,
  stocksTableDirection,
  isTradingDayPresent
}) => {
  if (!withSameErDate && !isTradingDayPresent) {
    return (
      <Placeholder>
        {placeholderLines.map(
          value => <Placeholder.Line key={['placeholder', value].join('')} />
        )}
      </Placeholder>
    );
  }

  return (
    withSameErDate && withSameErDate.length >= 0 ? (
      <StocksTable
        column={stocksTableColumn}
        direction={stocksTableDirection}
        handleClickStocksTableColumn={handleClickStocksTableColumn}
      />
    ) : (
      <Segment textAlign="center" vertical>
        <Message warning compact>
          <Message.Header>Warning</Message.Header>
          <p>No stocks data.</p>
        </Message>
      </Segment>
    )
  );
};

StocksTableLoader.propTypes = {
  handleClickStocksTableColumn: PropTypes.func.isRequired,

  withSameErDate: PropTypes.arrayOf(PropTypes.shape()),
  stocksTableColumn: PropTypes.string,
  stocksTableDirection: PropTypes.string,
  isTradingDayPresent: PropTypes.bool
};

StocksTableLoader.defaultProps = {
  withSameErDate: null,
  stocksTableColumn: null,
  stocksTableDirection: null,
  isTradingDayPresent: false
};

export default StocksTableLoader;
