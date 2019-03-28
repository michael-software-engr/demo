import React from 'react';
import PropTypes from 'prop-types';

import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { HORIZONTAL_ORIENTATION } from 'react-dates/constants';

import { joinYearMonthDay } from '../../lib/index';

 const falseFunc = ()=>false;

class Calendar extends React.Component {
  state = {
    // React Dates...
    // date: null,
    focused: false
  }

  static propTypes = {
    handleSelectErDate: PropTypes.func.isRequired,
    tradingDaysByErDate: PropTypes.shape().isRequired,
    erDate: PropTypes.shape()
  }

  static defaultProps = { erDate: null }

  handleIsDayBlocked = (momentDate) => {
    const groupKey = joinYearMonthDay(momentDate, { isMoment: true });
    return !this.props.tradingDaysByErDate[groupKey];
  }

  // React Dates...
  // handleOnDateChange = (date) => { this.setState({ date }); }
  handleOnFocusChange = ({ focused }) => { this.setState({ focused }); }

  render() {
    return (
      <SingleDatePicker
        // Required
        date={this.props.erDate}
        onDateChange={this.props.handleSelectErDate}
        focused={this.state.focused}
        onFocusChange={this.handleOnFocusChange}
        id="single-date-picker"
        isOutsideRange={falseFunc}

        // ... optional
        numberOfMonths={1}
        orientation={HORIZONTAL_ORIENTATION}
        withPortal
        isDayBlocked={this.handleIsDayBlocked}
      />
    );
  }
}

export default Calendar;
