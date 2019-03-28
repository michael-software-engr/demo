import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BurgerMenu from 'react-burger-menu';
import classNames from 'classnames';

import '../../../../css/components/app/mobileContainer/burgerMenuDemo/index.css';

import MenuWrap from './MenuWrap';

class BurgerMenuDemo extends Component {
  static propTypes = {
    menus: PropTypes.shape().isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      currentMenu: 'slide',
      side: 'left'
    };

    this.ids = {
      pageWrapId: 'page-wrap',
      outerContainerId: 'outer-container'
    };
  }

  getItems() {
    let items;

    switch (this.props.menus[this.state.currentMenu].items) {
      case 1:
        items = [
          <a key="0" href="/favorites">
            <i className="fa fa-fw fa-star-o" />
            <span>Favorites</span>
          </a>,
          <a key="1" href="/alerts">
            <i className="fa fa-fw fa-bell-o" />
            <span>Alerts</span>
          </a>,
          <a key="2" href="/messages">
            <i className="fa fa-fw fa-envelope-o" />
            <span>Messages</span>
          </a>,
          <a key="3" href="/comments">
            <i className="fa fa-fw fa-comment-o" />
            <span>Comments</span>
          </a>,
          <a key="4" href="/analytics">
            <i className="fa fa-fw fa-bar-chart-o" />
            <span>Analytics</span>
          </a>,
          <a key="5" href="/reading-list">
            <i className="fa fa-fw fa-newspaper-o" />
            <span>Reading List</span>
          </a>
        ];
        break;
      case 2:
        items = [
          <h2 key="0">
            <i className="fa fa-fw fa-inbox fa-2x" />
            <span>Sidebar</span>
          </h2>,
          <a key="1" href="/data-management">
            <i className="fa fa-fw fa-database" />
            <span>Data Management</span>
          </a>,
          <a key="2" href="/location">
            <i className="fa fa-fw fa-map-marker" />
            <span>Location</span>
          </a>,
          <a key="3" href="/study">
            <i className="fa fa-fw fa-mortar-board" />
            <span>Study</span>
          </a>,
          <a key="4" href="/collections">
            <i className="fa fa-fw fa-picture-o" />
            <span>Collections</span>
          </a>,
          <a key="5" href="/credits">
            <i className="fa fa-fw fa-money" />
            <span>Credits</span>
          </a>
        ];
        break;
      default:
        items = [
          <a key="0" href="/favorites">
            <i className="fa fa-fw fa-star-o" />
            <span>Favorites</span>
          </a>,
          <a key="1" href="/alerts">
            <i className="fa fa-fw fa-bell-o" />
            <span>Alerts</span>
          </a>,
          <a key="2" href="/messages">
            <i className="fa fa-fw fa-envelope-o" />
            <span>Messages</span>
          </a>,
          <a key="3" href="/comments">
            <i className="fa fa-fw fa-comment-o" />
            <span>Comments</span>
          </a>,
          <a key="4" href="/analytics">
            <i className="fa fa-fw fa-bar-chart-o" />
            <span>Analytics</span>
          </a>,
          <a key="5" href="/reading-list">
            <i className="fa fa-fw fa-newspaper-o" />
            <span>Reading List</span>
          </a>
        ];
    }

    return items;
  }

  getMenu() {
    const Menu = BurgerMenu[this.state.currentMenu];
    const items = this.getItems();

    const { outerContainerId, pageWrapId } = this.ids;

    if (this.state.side === 'right') {
      return (
        <MenuWrap wait={20} side={this.state.side}>
          <Menu
            id={this.state.currentMenu}
            outerContainerId={outerContainerId}
            pageWrapId={pageWrapId}
            right
          >
            {items}
          </Menu>
        </MenuWrap>
      );
    }

    return (
      <MenuWrap wait={20}>
        <Menu
          id={this.state.currentMenu}
          pageWrapId={pageWrapId}
          outerContainerId={outerContainerId}
        >
          {items}
        </Menu>
      </MenuWrap>
    );
  }

  changeMenu = (event, menu) => {
    event.preventDefault();
    this.setState({ currentMenu: menu });
  }

  changeSide = (event, side) => {
    event.preventDefault();
    this.setState({ side });
  }

  render() {
    const buttons = Object.keys(this.props.menus).map(menu => (
      <a
        key={menu}
        className={classNames({ 'current-demo': menu === this.state.currentMenu })}
        onClick={(event) => { this.changeMenu(event, menu); }}
        href="/placeholder/current-demo"
      >
        {this.props.menus[menu].buttonText}
      </a>
    ));

    const { outerContainerId, pageWrapId } = this.ids;

    return (
      <div id={outerContainerId} style={{ height: '100%' }}>
        {this.getMenu()}
        <main id={pageWrapId}>
          <h1><a href="https://github.com/negomi/react-burger-menu">react-burger-menu</a></h1>
          <a
            className={classNames({
              'side-button': true, left: true, active: this.state.side === 'left'
            })}
            onClick={(event) => { this.changeSide(event, 'left'); }}
            href="/placeholder/side-button/left"
          >
            Left
          </a>
          <a
            className={classNames({
              'side-button': true,
              right: true,
              active: this.state.side === 'right'
            })}
            onClick={(event) => { this.changeSide(event, 'right'); }}
            href="/placeholder/side-button/right"
          >
            Right
          </a>
          <h2 className="description">
            An off-canvas sidebar React component with a collection of effects and
            styles using CSS transitions and SVG path animations.
          </h2>
          <nav className="demo-buttons">
            {buttons}
          </nav>

          Inspired by
          {' '}
          <a href="https://github.com/codrops/OffCanvasMenuEffects">Off-Canvas Menu Effects</a>
          {' '}
          and
          {' '}
          <a href="https://github.com/codrops/SidebarTransitions">Sidebar Transitions</a>
          {' '}
          by Codrops
        </main>
      </div>
    );
  }
}

const menus = {
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

export default () => <BurgerMenuDemo menus={menus} />;
