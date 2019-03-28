import React from 'react';
import PropTypes from 'prop-types';

import { NavHashLink as NavLink } from 'react-router-hash-link';
// import { NavLink } from 'react-router-dom';

import { Menu, Dropdown } from 'semantic-ui-react';

import classNames from 'classnames';

import '../../../../css/components/app/mobileContainer/burgerMenu/index.css';

import '../../../../css/components/app/mobileContainer/burgerMenu/SidebarItems.css';

import menuRoutes from '../../../../routes/menu/routes';

class SidebarItems extends React.Component {
  static propTypes = {
    handleLinkClick: PropTypes.func.isRequired
  }

  state = {
    pointerHoverClass: ''
  }

  onMouseEnterHandler = () => {
    this.setState({ pointerHoverClass: 'pointer-hover' });
  }

  onMouseLeaveHandler = () => {
    this.setState({ pointerHoverClass: 'leave' });
  }

  render() {
    const { handleLinkClick } = this.props;

    return (
      menuRoutes.map(({
        key, path, href, title, subRoutes
      }) => (
        subRoutes ? (
          <Menu.Item key={key}>
            <Dropdown text={title} pointing="left" icon="caret right">
              <Dropdown.Menu
                className={
                  classNames(
                    'App--MobileContainer--BurgerMenu--SidebarItems--DropdownMenu',
                    this.state.pointerHoverClass
                  )
                }
              >
                {
                  subRoutes.map((sroute, ix) => {
                    if (sroute.noMenu) return null;

                    const srKey = sroute.key;
                    const srPath = sroute.path;
                    const srHref = sroute.href;
                    const srTitle = sroute.title;

                    const baseProps = {
                      key: srKey,
                      text: srTitle,
                      as: NavLink,
                      to: srHref || srPath,
                      onClick: handleLinkClick
                    };

                    const props = {
                      ...baseProps,
                      ...(ix === 0 ? {
                        onMouseEnter: this.onMouseEnterHandler,
                        onMouseLeave: this.onMouseLeaveHandler
                      } : {})
                    };

                    return <Dropdown.Item {...props} />;
                  })
                }
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        ) : (
          <Menu.Item
            key={key}
            as={NavLink}
            to={href || path}
            onClick={handleLinkClick}
          >
            {title}
          </Menu.Item>
        )
      ))
    );
  }
}

export default SidebarItems;
