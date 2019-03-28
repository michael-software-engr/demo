import React from 'react';
import PropTypes from 'prop-types';

// import { connect } from 'react-redux';

import {
  Button,
  Container,
  Header,
  Segment
} from 'semantic-ui-react';

const Placeholder = ({ title, id }) => (
  <div>
    <Segment style={{ padding: '8em 0em' }} vertical id={id}>
      <Container text>
        <Header as="h3" style={{ fontSize: '2em' }}>
          Placeholder:
          {' '}
          {title}
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <Button as="a" size="large">
          Read More
        </Button>
      </Container>
    </Segment>
  </div>
);

Placeholder.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string
  // mobile: PropTypes.shape()
};

Placeholder.defaultProps = {
  title: '',
  id: ''
  // mobile: {}
};

export default Placeholder;

// const mapStateToProps = state => ({
//   mobile: state[mobileModule.getKey()]
// });

// export default connect(mapStateToProps)(Placeholder);
