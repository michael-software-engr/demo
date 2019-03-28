import React from 'react';
// import PropTypes from 'prop-types';

// import { connect } from 'react-redux';

import { NavHashLink as NavLink } from 'react-router-hash-link';
// import { NavLink } from 'react-router-dom';

import {
  Container,
  Grid,
  Header,
  List,
  Segment
} from 'semantic-ui-react';

import aboutRoutes from '../../../routes/about/routes';
import * as about from '../../../routes/about/index';

import productsAndServicesRoutes from '../../../routes/productsAndServices/routes';
import * as productsAndServices from '../../../routes/productsAndServices/index';

import '../../../css/components/landingPage/footer/index.css';

const Footer = () => (
  <Segment inverted vertical className="App--Footer">
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={4}>
            <Header inverted as="h4" content={about.title} />
            <List link inverted>
              {
                aboutRoutes.map(({ key, href, title }) => (
                  <List.Item key={key} as={NavLink} to={href} smooth>{title}</List.Item>
                ))
              }
            </List>
          </Grid.Column>
          <Grid.Column width={4}>
            <Header inverted as="h4" content={productsAndServices.title} />
            <List link inverted>
              {
                productsAndServicesRoutes.map(({ key, href, title }) => (
                  <List.Item key={key} as={NavLink} to={href} smooth>{title}</List.Item>
                ))
              }
            </List>
          </Grid.Column>
          <Grid.Column width={5}>
            <Header as="h4" inverted>
              Other
              {
                // Footer Header
              }
            </Header>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              {' '}
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              {
                // Extra space for a call to action inside the footer that could
                // help re-engage users.
              }
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

export default Footer;

// Footer.propTypes = {
//   mobile: PropTypes.bool
// };

// Footer.defaultProps = {
//   mobile: false
// };

// const mapStateToProps = state => ({
//   mobile: state[mobileModule.getKey()]
// });

// export default connect(mapStateToProps)(Footer);
