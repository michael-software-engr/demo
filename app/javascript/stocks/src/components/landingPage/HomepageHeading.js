import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  Button,
  Container,
  Header,
  Icon
} from 'semantic-ui-react';

import classNames from 'classnames';

import mobileModule from '../../redux/modules/mobile/index';

import '../../css/components/landingPage/HomepageHeading.css';

const baseClassName = 'App--HomepageHeading';
const mainHeadingClassName = `${baseClassName} main-heading`;
const subTitleClassName = `${baseClassName} sub-title`;

const HomepageHeading = ({ mobile: { isMobile } }) => (
  <Container text>
    <Header
      as="h1"
      content="Hello"
      inverted
      className={classNames(mainHeadingClassName, { mobile: isMobile })}
    />

    <Header
      as="h2"
      content="Do whatever you want when you want to."
      inverted
      className={classNames(subTitleClassName, { mobile: isMobile })}
    />
    <Button primary size={isMobile ? 'small' : 'huge'}>
      Get Started
      <Icon name="right arrow" />
    </Button>
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.shape()
};

HomepageHeading.defaultProps = {
  mobile: {}
};

const mapStateToProps = state => ({
  mobile: state[mobileModule.getKey()]
});

export default connect(mapStateToProps)(HomepageHeading);
