import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'semantic-ui-react';

import '../../../../css/components/stocks/stocksTable/filters/index.css';

const SetFilter = ({ onClick, disabled, content }) => {
  if (!disabled) {
    if (!onClick) {
      throw new Error('onClick prop must be defined if button is not disabled.');
    }
  }

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      primary

      // Show color filled button if no content (if 'Set Filter').
      basic={!!content}

      size="mini"
      className={[
        'App--Stocks--StocksTable--Filter--SetFilter',
        content ? 'Basic' : ''
      ].join(' ')}
    >
      {content || 'Set Filter'}
    </Button>
  );
};

SetFilter.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  content: PropTypes.string
};

SetFilter.defaultProps = {
  onClick: null,
  disabled: false,
  content: null
};

export default SetFilter;
