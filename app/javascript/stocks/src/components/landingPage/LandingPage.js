import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  Segment
} from 'semantic-ui-react';

import classNames from 'classnames';

import HomepageHeading from './HomepageHeading';
import Footer from './footer/Footer';

import mobileModule from '../../redux/modules/mobile/index';

import '../../css/components/landingPage/index.css';

import imageWhitePng from './images/white-image.png';
import imageNanJpg from './images/nan.jpg';

/* eslint-disable react/prefer-stateless-function */
class LandingPage extends React.Component {
  static propTypes = {
    mobile: PropTypes.shape(),
    id: PropTypes.string
  }

  static defaultProps = {
    mobile: {},
    id: ''
  }

  render() {
    const { id } = this.props;
    const { isMobile } = this.props.mobile;

    return (
      <div className="App--LandingPage" id={id}>
        <Segment
          inverted
          textAlign="center"
          className={classNames('heading-segment', { mobile: isMobile })}
          vertical
        >
          <HomepageHeading mobile={isMobile} />
        </Segment>

        <Segment className="segment-0" vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h3" className="header">
                  We Help Companies and Companions
                </Header>
                <p className="content">
                  We can give your company superpowers to do things that they never thought
                  possible.
                  Let us delight your customers and empower your needs... through pure data
                  analytics.
                </p>
                <Header as="h3" className="header">
                  We Make Bananas That Can Dance
                </Header>
                <p className="content">
                  Yes that&#39;s right, you thought it was the stuff of dreams, but even bananas
                  can be
                  bioengineered.
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                <Image bordered rounded size="large" src={imageWhitePng} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Button size="huge">Check Them Out</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment className="segment-1" vertical>
          <Grid celled="internally" columns="equal" stackable>
            <Grid.Row textAlign="center">
              <Grid.Column className="grid-column">
                <Header as="h3" className="header">
                  &#34;What a Company&#34;
                </Header>
                <p className="content">That is what they all say about us</p>
              </Grid.Column>
              <Grid.Column className="grid-column">
                <Header as="h3" className="header">
                  &#34;I shouldn&#39;t have gone with their competitor.&#34;
                </Header>
                <p className="content">
                  <Image avatar src={imageNanJpg} />
                  <b>Nan</b>
                  {' '}
                  Chief Fun Officer Acme Toys
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment className="segment-2" vertical>
          <Container text>
            <Header as="h3" className="custom-header">
              Breaking The Grid, Grabs Your Attention
            </Header>
            <p className="content">
              Instead of focusing on content creation and hard work, we have learned how to
              master the
              art of doing nothing by providing massive amounts of whitespace and generic
              content that
              can seem massive, monolithic and worth your attention.
            </p>
            <Button as="a" size="large">
              Read More
            </Button>

            <Divider
              as="h4"
              className="header divider" // ... "header" part of Semantic UI example
              horizontal
            >
              <a href="/dummy/case-studies">Case Studies</a>
            </Divider>

            <Header as="h3" className="custom-header">
              Did We Tell You About Our Bananas?
            </Header>
            <p className="content">
              Yes I know you probably disregarded the earlier boasts as non-sequitur
              filler content, but
              it&#39;s really true. It took years of gene splicing and combinatory DNA research,
              but our
              bananas can really dance.
            </p>
            <Button as="a" size="large">
              I&#39;m Still Quite Interested
            </Button>
          </Container>
        </Segment>

        <Footer />
      </div>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */

const mapStateToProps = state => ({
  mobile: state[mobileModule.getKey()]
});

export default connect(mapStateToProps)(LandingPage);
