import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import '../../../../css/components/app/mobileContainer/burgerMenu/index.css';

const Configurator = ({
  buttons,
  side,
  changeSide
}) => (
  <div>
    <h1><a href="https://github.com/negomi/react-burger-menu">react-burger-menu</a></h1>
    <a
      className={classNames({
        'side-button': true, left: true, active: side === 'left'
      })}
      onClick={(event) => { changeSide(event, 'left'); }}
      href="/placeholder/side-button/left"
    >
      Left
    </a>
    <a
      className={classNames({
        'side-button': true,
        right: true,
        active: side === 'right'
      })}
      onClick={(event) => { changeSide(event, 'right'); }}
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
  </div>
);

Configurator.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.node).isRequired,
  changeSide: PropTypes.func.isRequired,

  side: PropTypes.string
};

Configurator.defaultProps = {
  side: null
};

export default Configurator;
