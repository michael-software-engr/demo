import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';

import { Responsive } from 'semantic-ui-react';

import DesktopContainer from './DesktopContainer';
import MobileContainer from './mobileContainer/MobileContainer';

import { unconnectedSetMobile } from '../../redux/modules/mobile/actions';

const getWidth = () => (
  Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  )
);

class ResponsiveContainer extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    setMobile: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.resizeHandler();
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  resizeHandler = () => {
    const { setMobile } = this.props;

    if (getWidth() > Responsive.onlyTablet.minWidth) {
      setMobile(false);
      return;
    }

    setMobile(true);
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
      </div>
    );
  }
}

export default connect(null, { setMobile: unconnectedSetMobile })(ResponsiveContainer);
