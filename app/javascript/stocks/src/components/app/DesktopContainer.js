import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { NavHashLink as NavLink } from 'react-router-hash-link';
// import { NavLink } from 'react-router-dom';

import {
  // Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility,
  Dropdown
} from 'semantic-ui-react';

// import Footer from './footer/Footer';

import menuRoutes from '../../routes/menu/routes';

import '../../css/components/app/index.css';

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => { this.setState({ fixed: false }); }

  showFixedMenu = () => { this.setState({ fixed: true }); }

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive
        minWidth={Responsive.onlyTablet.minWidth}
        className="App--DesktopContainer"
      >
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            className="menu-segment"
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                {
                  menuRoutes.map(({
                    key, path, href, title, subRoutes
                  }) => (
                    subRoutes ? (
                      <Menu.Item key={key}>
                        <Dropdown text={title}>
                          <Dropdown.Menu>
                            {
                              subRoutes.map((sroute) => {
                                const srKey = sroute.key;
                                const srPath = sroute.path;
                                const srHref = sroute.href;
                                const srTitle = sroute.title;

                                if (sroute.noMenu) return null;

                                return (
                                  <Dropdown.Item
                                    key={srKey}
                                    text={srTitle}
                                    as={NavLink}
                                    to={srHref || srPath}
                                  />
                                );
                              })
                            }
                          </Dropdown.Menu>
                        </Dropdown>
                      </Menu.Item>
                    ) : (
                      <Menu.Item key={key} as={NavLink} to={href || path}>{title}</Menu.Item>
                    )
                  ))
                }

                {
                  // <Menu.Item position="right">
                  //   <Button as="a" inverted={!fixed}>
                  //     Log in
                  //   </Button>
                  //   <Button as="a" inverted={!fixed} primary={fixed} className="sign-up-button">
                  //     Sign Up
                  //   </Button>
                  // </Menu.Item>
                }
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {children}

        {
          // <Footer />
        }
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default DesktopContainer;
