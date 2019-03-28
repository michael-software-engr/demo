/* eslint-disable no-undef */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../../css/components/rrweRefactored/index.css';

export default class List extends Component {
  static propTypes = {
    renderItem: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.shape(), PropTypes.arrayOf(PropTypes.shape())])
    ).isRequired,
    onLoadMoreClick: PropTypes.func.isRequired,

    loadingLabel: PropTypes.string,
    pageCount: PropTypes.number,
    isFetching: PropTypes.bool,
    nextPageUrl: PropTypes.string
  }

  static defaultProps = {
    isFetching: true,
    loadingLabel: 'Loading...',
    pageCount: 0,
    nextPageUrl: null
  }

  renderLoadMore() {
    const { isFetching, onLoadMoreClick } = this.props;
    return (
      <button
        type="button"
        className="load-more-button"
        onClick={onLoadMoreClick}
        disabled={isFetching}
      >
        {isFetching ? 'Loading...' : 'Load More'}
      </button>
    );
  }

  render() {
    const {
      isFetching, nextPageUrl, pageCount,
      items, renderItem, loadingLabel
    } = this.props;

    const isEmpty = items.length === 0;
    if (isEmpty && isFetching) {
      return <h2><i>{loadingLabel}</i></h2>;
    }

    const isLastPage = !nextPageUrl;
    if (isEmpty && isLastPage) {
      return <h1><i>Nothing here!</i></h1>;
    }

    return (
      <div className="App--RrweRefactored--Presenters--List">
        {items.map(renderItem)}
        {pageCount > 0 && !isLastPage && this.renderLoadMore()}
      </div>
    );
  }
}
