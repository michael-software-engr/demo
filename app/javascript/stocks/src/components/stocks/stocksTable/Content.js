import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import '../../../css/components/stocks/stocksTable/index.css';

const contentClassName = 'App--Stocks--StocksTable--Content';

const Content = ({
  formatter,
  columnData,
  hrefBuilder
}) => {
  const formatted = formatter ? formatter(columnData) : columnData;

  if (!hrefBuilder) {
    return (
      <span className={classNames(contentClassName, 'Text')}>
        {formatted}
      </span>
    );
  }

  // TODO: use React Router Link maybe?
  return (
    <a
      href={hrefBuilder(columnData)}
      rel="noopener noreferrer"
      target="_blank"
      className={classNames(contentClassName, 'Anchor')}
    >
      {formatted}
    </a>
  );
};

Content.propTypes = {
  columnData: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  formatter: PropTypes.func,
  hrefBuilder: PropTypes.func
};

Content.defaultProps = {
  columnData: null,
  formatter: null,
  hrefBuilder: null
};

export default Content;
