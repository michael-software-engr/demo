import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import { Responsive } from 'semantic-ui-react';

import classNames from 'classnames';

import MenuWrap from './MenuWrap';
import Configurator from './Configurator';
// import Footer from '../../footer/Footer';

import '../../../../css/components/app/mobileContainer/burgerMenu/index.css';

const reactBurgerMenuOptions = {
  slide: { buttonText: 'Slide', items: 1 },
  stack: { buttonText: 'Stack', items: 1 },
  elastic: { buttonText: 'Elastic', items: 1 },
  bubble: { buttonText: 'Bubble', items: 1 },
  push: { buttonText: 'Push', items: 1 },
  pushRotate: { buttonText: 'Push Rotate', items: 2 },
  scaleDown: { buttonText: 'Scale Down', items: 2 },
  scaleRotate: { buttonText: 'Scale Rotate', items: 2 },
  fallDown: { buttonText: 'Fall Down', items: 2 },
  reveal: { buttonText: 'Reveal', items: 1 }
};

const configureReactBurgerMenuParam = 'crbm';

class BurgerMenu extends Component {
  state = {
    sidebarOpened: false
  }

  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    location: PropTypes.shape().isRequired
  }

  constructor(props) {
    super(props);

    const currentMenu = window.sessionStorage.getItem('currentMenu');
    const side = window.sessionStorage.getItem('side');

    this.state = {
      currentMenu: currentMenu || 'slide',
      side: side || 'left',
      showReactBurgerMenuConfigurator: false
    };

    this.ids = {
      pageWrapId: 'page-wrap',
      outerContainerId: 'outer-container'
    };
  }

  componentDidMount() {
    const { search } = this.props.location;
    const searchParams = new URLSearchParams(search);

    if (searchParams.has(configureReactBurgerMenuParam)) {
      this.setState({ showReactBurgerMenuConfigurator: true });
      return;
    }

    this.setState({ showReactBurgerMenuConfigurator: false });
  }

  changeMenu = (event, menu) => {
    event.preventDefault();
    this.setState({ currentMenu: menu });
    window.sessionStorage.setItem('currentMenu', menu);
  }

  changeSide = (event, side) => {
    event.preventDefault();
    this.setState({ side });
    window.sessionStorage.setItem('side', side);
  }

  handleLinkClick = () => { this.setState({ sidebarOpened: false }); }

  render() {
    const buttons = Object.keys(reactBurgerMenuOptions).map(menu => (
      <a
        key={menu}
        className={classNames({ 'current-demo': menu === this.state.currentMenu })}
        onClick={(event) => { this.changeMenu(event, menu); }}
        href="/placeholder/current-demo"
      >
        {
          reactBurgerMenuOptions[menu].buttonText
        }
      </a>
    ));

    const { side, sidebarOpened, currentMenu } = this.state;
    const right = side === 'right';

    const { outerContainerId, pageWrapId } = this.ids;

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <div id={outerContainerId} style={{ height: '100%' }}>
          {
            <MenuWrap
              wait={20}
              side={side}
              currentMenu={currentMenu}
              outerContainerId={outerContainerId}
              pageWrapId={pageWrapId}
              sidebarOpened={sidebarOpened}
              right={right}
              handleLinkClick={this.handleLinkClick}
            />
          }

          <main id={pageWrapId}>
            {
              this.state.showReactBurgerMenuConfigurator ? (
                <Configurator
                  buttons={buttons}
                  side={this.state.side}
                  changeSide={this.changeSide}
                />
              ) : (
                this.props.children
              )
            }
          </main>

          {
            // <Footer />
          }
        </div>
      </Responsive>
    );
  }
}

export default withRouter(BurgerMenu);
