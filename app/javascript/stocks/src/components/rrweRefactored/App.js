/* eslint-disable no-undef */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Segment } from 'semantic-ui-react';

import Explore from './presenters/Explore';
import { unconnectedResetErrorMessage } from '../../redux/modules/rrweRefactored/actions';

import { getRoutePrefix, getRoutePrefixREEsc } from '../../routes/rrweRefactored/index';

import '../../css/components/rrweRefactored/index.css';

const routePrefix = getRoutePrefix();
const routePrefixREEsc = getRoutePrefixREEsc();

class App extends Component {
  static propTypes = {
    // Injected by React Redux
    resetErrorMessage: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,

    errorMessage: PropTypes.string,
    // Injected by React Router
    children: PropTypes.node,
    history: PropTypes.shape()
  }

  static defaultProps = {
    errorMessage: null,
    children: null,
    history: {}
  }

  handleDismissClick = (e) => {
    this.props.resetErrorMessage();
    e.preventDefault();
  }

  handleChange = (nextValue) => {
    this.props.history.push(`/${routePrefix}/${nextValue}`);
  }

  renderErrorMessage() {
    const { errorMessage } = this.props;
    if (!errorMessage) {
      return null;
    }

    return (
      <p className="error-message">
        <b>{errorMessage}</b>
        {' '}
        <button type="button" onClick={this.handleDismissClick}>
          Dismiss
        </button>
      </p>
    );
  }

  render() {
    const { children, inputValue } = this.props;

    return (
      <div className="App--RrweRefactored">
        <Segment
          textAlign="center"
          vertical
        >
          <Explore value={inputValue} onChange={this.handleChange} />

          <hr />

          {this.renderErrorMessage()}
          {children}
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  errorMessage: state.errorMessage,
  inputValue: ownProps.location.pathname.replace(new RegExp(`/${routePrefixREEsc}`), '').substring(1),
});

export default withRouter(connect(mapStateToProps, {
  resetErrorMessage: unconnectedResetErrorMessage
})(App));
