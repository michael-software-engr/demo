import React from 'react';
import PropTypes from 'prop-types';

import ReactBurgerMenu from 'react-burger-menu';

import { Menu } from 'semantic-ui-react';

import SidebarItems from './SidebarItems';

class MenuWrap extends React.Component {
  static propTypes = {
    wait: PropTypes.number.isRequired,
    side: PropTypes.string,

    currentMenu: PropTypes.string.isRequired,
    outerContainerId: PropTypes.string.isRequired,
    pageWrapId: PropTypes.string.isRequired,
    sidebarOpened: PropTypes.bool,
    right: PropTypes.bool,
    handleLinkClick: PropTypes.func.isRequired
  }

  static defaultProps = {
    side: null,
    sidebarOpened: false,
    right: false
  }

  constructor(props) {
    super(props);
    this.state = { hidden: false };
  }

  componentWillReceiveProps(nextProps) {
    const sideChanged = this.props.right !== nextProps.right;

    if (sideChanged) {
      this.setState({ hidden: true });

      setTimeout(() => {
        this.show();
      }, this.props.wait);
    }
  }

  show() { this.setState({ hidden: false }); }

  render() {
    const style = this.state.hidden ? { display: 'none' } : null;

    const {
      currentMenu,
      outerContainerId,
      pageWrapId,
      right,
      sidebarOpened,
      handleLinkClick,
      side
    } = this.props;

    const SelectedReactBurgerMenu = ReactBurgerMenu[currentMenu];

    return (
      <div style={style} className={side}>
        {
          <SelectedReactBurgerMenu
            id={currentMenu}
            outerContainerId={outerContainerId}
            pageWrapId={pageWrapId}
            right={right}
            isOpen={sidebarOpened}
          >
            <Menu inverted vertical>
              <SidebarItems handleLinkClick={handleLinkClick} />
            </Menu>
          </SelectedReactBurgerMenu>
        }
      </div>
    );
  }
}

export default MenuWrap;
