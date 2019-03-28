import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Input
} from 'semantic-ui-react';

import classNames from 'classnames';

import { unconnectedSetFilterSymbol } from '../../../../redux/modules/stocks/actions/index';
import stocksModule from '../../../../redux/modules/stocks/index';

import { filterClassName } from './lib';

const stocksModuleKey = stocksModule.getKey();

class SymbolFilter extends React.Component {
  state = {
    searchTerm: ''
  }

  handleInputChange = (event, { value }) => {
    const newState = { searchTerm: value };
    this.setState(
      newState,
      () => { this.props.setFilterSymbol(newState); }
    );
  }

  render() {
    const { searchTerm } = this.state;

    return (
      <Input
        key="input"
        fluid
        onChange={this.handleInputChange}
        value={searchTerm}
        className={classNames(filterClassName, 'SymbolFilter')}
      />
    );
  }
}

SymbolFilter.propTypes = {
  // Injected by React Redux
  setFilterSymbol: PropTypes.func.isRequired,
  [stocksModuleKey]: PropTypes.shape().isRequired, /* eslint-disable-line react/no-unused-prop-types, max-len */
};

const mapStateToProps = state => ({
  stocks: state[stocksModuleKey]
});

export default connect(mapStateToProps, {
  setFilterSymbol: unconnectedSetFilterSymbol
})(SymbolFilter);
