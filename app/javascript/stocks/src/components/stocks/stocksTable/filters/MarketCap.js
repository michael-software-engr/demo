import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Portal, Segment } from 'semantic-ui-react';

import classNames from 'classnames';

import FilterForm from './FilterForm';
import SetFilter from './SetFilter';

import { unconnectedSetFilterMarketCap } from '../../../../redux/modules/stocks/actions/index';
import stocksModule from '../../../../redux/modules/stocks/index';

import {
  isFloat,
  initialState,
  numberSuffixOptions,
  numberSuffixOptionsByValue,
  mustEnterFloatMessage,
  filterClassName
} from './lib';

import '../../../../css/components/stocks/stocksTable/filters/index.css';

const stocksModuleKey = stocksModule.getKey();

const localInitialState = { ...initialState, localNumberSuffix: numberSuffixOptions[0].value };

class MarketCap extends React.Component {
  state = localInitialState

  isOperandValid = isFloat

  handleOperatorChange = (event, { value }) => { this.setState({ localStateOperator: value }); }

  handleOperandChange = (event, { value }) => { this.setState({ localStateOperand: value }); }

  handleOnFilterClick = () => { this.setState({ showFilter: true }); }

  handlerOnCloseFilter = () => { this.setState({ showFilter: false }); }

  handleNumberSuffixChange = (event, { value }) => { this.setState({ localNumberSuffix: value }); }

  handleOnSubmit = (event) => {
    event.preventDefault();
    this.setState({ showFilter: false });
    const { localStateOperator, localStateOperand, localNumberSuffix } = this.state;
    if (!localStateOperator || !localStateOperand) return;

    const multiplier = localNumberSuffix
      && numberSuffixOptionsByValue[localNumberSuffix].multiplier;

    this.props.setFilterMarketCap({
      operator: localStateOperator,
      operand: multiplier ? (multiplier * localStateOperand) : localStateOperand
    });
  }

  handleOnReset = (event) => {
    event.preventDefault();
    this.setState(localInitialState);
    this.props.setFilterMarketCap();
  }

  render() {
    const { columnName, title } = this.props;
    const {
      showFilter,
      localStateOperator,
      localStateOperand,
      localNumberSuffix
    } = this.state;

    const filter = this.props[stocksModuleKey].filters[columnName];

    const content = filter && (
      [localStateOperator, localStateOperand].concat(
        localNumberSuffix ? [localNumberSuffix] : []
      )
    ).join(' ');

    return (
      showFilter ? (
        [
          <Portal
            key="portal"
            open={showFilter}
            onClose={this.handlerOnCloseFilter}
          >
            <Segment
              raised
              className={classNames(filterClassName, 'MarketCap')}
            >
              <FilterForm
                handleOperatorChange={this.handleOperatorChange}
                handleOperandChange={this.handleOperandChange}
                handleOnSubmit={this.handleOnSubmit}
                handleOnReset={this.handleOnReset}
                isOperandValid={this.isOperandValid}
                operandInvalidMessage={mustEnterFloatMessage}
                title={title}

                operator={localStateOperator}
                operand={localStateOperand}
                handleNumberSuffixChange={this.handleNumberSuffixChange}
                numberSuffix={localNumberSuffix}
              />
            </Segment>
          </Portal>,
          <SetFilter key="button" disabled content={content} />
        ]
      ) : (
        <SetFilter onClick={this.handleOnFilterClick} content={content} />
      )
    );
  }
}

MarketCap.propTypes = {
  // Injected by React Redux
  setFilterMarketCap: PropTypes.func.isRequired,
  [stocksModuleKey]: PropTypes.shape().isRequired, /* eslint-disable-line react/no-unused-prop-types, max-len */

  // Injected by ancestor component.
  columnName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  stocks: state[stocksModuleKey]
});

export default connect(mapStateToProps, {
  setFilterMarketCap: unconnectedSetFilterMarketCap
})(MarketCap);
