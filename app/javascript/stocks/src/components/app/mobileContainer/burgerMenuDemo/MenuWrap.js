import React from 'react';
import PropTypes from 'prop-types';

class MenuWrap extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    wait: PropTypes.number.isRequired,
    side: PropTypes.string
  }

  static defaultProps = { side: null }

  constructor(props) {
    super(props);
    this.state = {
      hidden: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const sideChanged = this.props.children.props.right !== nextProps.children.props.right;

    if (sideChanged) {
      this.setState({ hidden: true });

      setTimeout(() => {
        this.show();
      }, this.props.wait);
    }
  }

  show() {
    this.setState({ hidden: false });
  }

  render() {
    let style;

    if (this.state.hidden) {
      style = { display: 'none' };
    }

    return (
      <div style={style} className={this.props.side}>
        {this.props.children}
      </div>
    );
  }
}

export default MenuWrap;
