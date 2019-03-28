import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Portal, Segment } from 'semantic-ui-react';

import classNames from 'classnames';

import FilterForm from './FilterForm';
import SetFilter from './SetFilter';

import { unconnectedSetFilterPreviousMove } from '../../../../redux/modules/stocks/actions/index';
import stocksModule from '../../../../redux/modules/stocks/index';

import {
  isFloat,
  initialState,
  mustEnterFloatMessage,
  filterClassName
} from './lib';

import '../../../../css/components/stocks/stocksTable/filters/index.css';

const stocksModuleKey = stocksModule.getKey();

class PreviousMove extends React.Component {
  state = initialState

  isOperandValid = isFloat

  handleOperatorChange = (event, { value }) => { this.setState({ localStateOperator: value }); }

  handleOperandChange = (event, { value }) => { this.setState({ localStateOperand: value }); }

  handleOnFilterClick = () => { this.setState({ showFilter: true }); }

  handlerOnCloseFilter = () => { this.setState({ showFilter: false }); }

  handleOnSubmit = (event) => {
    event.preventDefault();
    this.setState({ showFilter: false });
    const { localStateOperator, localStateOperand } = this.state;
    if (!localStateOperator || !localStateOperand) return;
    this.props.setFilterPreviousMove({ operator: localStateOperator, operand: localStateOperand });
  }

  handleOnReset = (event) => {
    event.preventDefault();
    this.setState(initialState);
    this.props.setFilterPreviousMove();
  }

  render() {
    const { columnName, title } = this.props;
    const { showFilter, localStateOperator, localStateOperand } = this.state;

    const filter = this.props[stocksModuleKey].filters[columnName];
    const { operator, operand } = filter || {};
    const content = filter && [operator, operand].join(' ');

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
              className={classNames(filterClassName, 'PreviousMove')}
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

PreviousMove.propTypes = {
  // Injected by React Redux
  setFilterPreviousMove: PropTypes.func.isRequired,
  [stocksModuleKey]: PropTypes.shape().isRequired, /* eslint-disable-line react/no-unused-prop-types, max-len */

  // Injected by ancestor component.
  columnName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  stocks: state[stocksModuleKey]
});

export default connect(mapStateToProps, {
  setFilterPreviousMove: unconnectedSetFilterPreviousMove
})(PreviousMove);
