import React from 'react';
import PropTypes from 'prop-types';

import {
  Form, Header, Popup
} from 'semantic-ui-react';

import { arithmeticOperatorOptions, numberSuffixOptions } from './lib';

import '../../../../css/components/stocks/stocksTable/filters/index.css';

const operatorInvalidMessage = 'Must select an operator.';
const operandBlankMessage = 'Must enter filter value.';

class FilterForm extends React.Component {
  state = {
    operatorError: false,
    operandError: false,
    popUpIsOpen: false,
    popupMessage: 'ERROR: you should not be seeing this message.'
  }

  handleOnSubmit = (event) => {
    const { operator, operand } = this.props;

    if (!operator) {
      this.setState(
        { popUpIsOpen: true, popupMessage: operatorInvalidMessage, operatorError: true }
      );
      return;
    }

    if (!operand || !operand.toString().trim()) {
      this.setState({ popUpIsOpen: true, popupMessage: operandBlankMessage, operandError: true });
      return;
    }

    const { isOperandValid, operandInvalidMessage } = this.props;
    if (isOperandValid && !isOperandValid(operand)) {
      this.setState({
        popUpIsOpen: true,
        popupMessage: operandInvalidMessage || 'Invalid filter value.',
        operandError: true
      });
      return;
    }

    this.props.handleOnSubmit(event);
  }

  handleOnInputClick = () => { this.setState({ popUpIsOpen: false, operatorError: false }); }

  handleOnOperatorDropdownClick = () => {
    this.setState({ popUpIsOpen: false, operatorError: false });
  }

  handleOnOperandInputClick = () => {
    this.setState({ popUpIsOpen: false, operandError: false });
  }

  handleOnNumberSuffixInputClick = () => {
    this.setState({ popUpIsOpen: false, operandError: false });
  }

  render() {
    const { handleOnInputClick } = this;

    const {
      handleOperatorChange,
      handleOperandChange,
      operator,
      operand,

      handleOnReset,

      handleNumberSuffixChange,
      numberSuffix,

      title
    } = this.props;

    const FormButton = (
      <Form.Button
        positive
        onClick={this.handleOnSubmit}
      >
        Submit
      </Form.Button>
    );

    return (
      <Form>
        <Header as="h4">
          Set &quot;
          {title}
          &quot;
          {' '}
          filter
        </Header>

        <Form.Group inline>
          <Form.Dropdown
            error={this.state.operatorError}
            onChange={handleOperatorChange}
            onClick={handleOnInputClick}
            placeholder={arithmeticOperatorOptions[0].value}
            options={arithmeticOperatorOptions}
            value={operator}
          />

          <Form.Input
            error={this.state.operandError}
            className="OperandInput"
            onChange={handleOperandChange}
            onClick={handleOnInputClick}
            value={operand || ''}
          />

          {
            handleNumberSuffixChange && (
              <Form.Dropdown
                onChange={handleNumberSuffixChange}
                onClick={handleOnInputClick}
                placeholder={numberSuffixOptions[0].value}
                options={numberSuffixOptions}
                value={numberSuffix}
              />
            )
          }

          <Popup
            basic
            open={this.state.popUpIsOpen}
            style={{
              border: '1px solid #C48382',
              backgroundColor: '#FFF6F6',
              color: '#C48382'
            }}

            trigger={FormButton}
            content={<div>{this.state.popupMessage}</div>}
            on="click"
            position="bottom right"
          />

          <Form.Button
            negative
            onClick={handleOnReset}
          >
            Remove
          </Form.Button>
        </Form.Group>
      </Form>
    );
  }
}

FilterForm.propTypes = {
  handleOperatorChange: PropTypes.func.isRequired,
  handleOperandChange: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  handleOnReset: PropTypes.func.isRequired,

  isOperandValid: PropTypes.func.isRequired,
  operator: PropTypes.string,
  operand: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  operandInvalidMessage: PropTypes.string,

  handleNumberSuffixChange: PropTypes.func,
  numberSuffix: PropTypes.string,

  title: PropTypes.string.isRequired
};

FilterForm.defaultProps = {
  operator: null,
  operand: null,
  operandInvalidMessage: null,

  handleNumberSuffixChange: null,
  numberSuffix: null
};

export default FilterForm;
