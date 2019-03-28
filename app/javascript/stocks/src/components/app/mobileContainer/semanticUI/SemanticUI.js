import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import {
  Button,
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Dropdown
} from 'semantic-ui-react';

// import Footer from '../../footer/Footer';

import menuRoutes from '../../../../routes/menu/routes';

import '../../../../css/components/app/index.css';

class SemanticUI extends Component {
  state = {
    sidebarOpened: false
  }

  handleSidebarHide = () => { this.setState({ sidebarOpened: false }); }

  handleToggle = () => { this.setState({ sidebarOpened: true }); }

  handleLinkClick = () => { this.setState({ sidebarOpened: false }); }

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        ref={this.handleContextRef}
        maxWidth={Responsive.onlyMobile.maxWidth}
        className="App--MobileContainer--SemanticUI"
      >
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="push"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            {
              menuRoutes.map(({
                key, path, href, title, subRoutes
              }) => (
                subRoutes ? (
                  <Menu.Item key={key}>
                    <Dropdown text={title} pointing="left" icon="caret right">
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
                                onClick={this.handleLinkClick}
                              />
                            );
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
                    onClick={this.handleLinkClick}
                  >
                    {title}
                  </Menu.Item>
                )
              ))
            }
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}>
            {
              // ... original menu
              <Segment
                inverted
                textAlign="center"
                vertical
                className="menu-segment"
              >
                <Container>
                  <Menu
                    inverted
                    pointing
                    secondary
                    size="large"
                    className="custom-menu"
                  >
                    <Menu.Item onClick={this.handleToggle}>
                      <Icon name="sidebar" />
                    </Menu.Item>
                    <Menu.Item position="right">
                      <Button as="a" inverted>
                        Log in
                      </Button>
                      <Button as="a" inverted className="sign-up-button">
                        Sign Up
                      </Button>
                    </Menu.Item>
                  </Menu>
                </Container>
              </Segment>
            }

            {children}

            {
              // <Footer />
            }
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    );
  }
}

SemanticUI.propTypes = {
  children: PropTypes.node.isRequired
};

export default SemanticUI;
