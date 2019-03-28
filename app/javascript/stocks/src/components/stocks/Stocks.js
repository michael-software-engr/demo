import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  Segment,
  Message,
  Container,
  Dimmer,
  Loader,
  Header,
  Image,
  Divider
} from 'semantic-ui-react';

import { Helmet } from 'react-helmet';

import lodash from 'lodash';

import {
  unconnectedLoadStocks,
  unconnectedLoadTradingDays,
  unconnectedSetErDate,
  unconnectedUpdateAfterLocationUpdate
} from '../../redux/modules/stocks/actions/index';
import stocksModule, { erDateHasData } from '../../redux/modules/stocks/index';
import * as erDateTools from '../../redux/modules/stocks/reducers/getDefaultErDateAndKey';

import StocksTableLoader from './stocksTable/StocksTableLoader';

import Calendar from './Calendar';

import { joinYearMonthDay } from '../../lib/index';

import reactReduxImg from './rr.png';

const stocksModuleKey = stocksModule.getKey();

const getIsTradingDayPresent = ({ actualErDate, tradingDaysByErDate }) => {
  if (!actualErDate) return false;

  return !!tradingDaysByErDate[
    joinYearMonthDay(actualErDate, { isMoment: true })
    // I don't know if all actualErDate's are going to be Moment's.
    // joinYearMonthDay(actualErDate)
  ];
};

const getYearMonth = (location) => {
  const erDateFromQueryParams = erDateTools.erDateFromQueryParams(location);

  if (erDateFromQueryParams) {
    return [erDateFromQueryParams.year(), (erDateFromQueryParams.month() + 1)];
  }

  const date = new Date();
  return [date.getFullYear(), (date.getMonth() + 1)];
};

const pageTitle = 'React/Redux Example - A Sortable/Filterable Stocks Table';

class Stocks extends React.Component {
  state = {
    stocksTableColumn: null,
    stocksTableDirection: null
  }

  static propTypes = {
    // Injected by React Router
    location: PropTypes.shape().isRequired,

    // Injected by React Redux
    loadStocks: PropTypes.func.isRequired,
    loadTradingDays: PropTypes.func.isRequired,
    setErDate: PropTypes.func.isRequired,
    updateAfterLocationUpdate: PropTypes.func.isRequired,
    [stocksModuleKey]: PropTypes.shape().isRequired /* eslint-disable-line react/no-unused-prop-types, max-len */
  }

  componentDidMount() {
    const { location } = this.props;
    const [year, month] = getYearMonth(location);

    // Fetch the current and next year's data.
    this.props.loadTradingDays([year, year + 1]);

    this.props.loadStocks({ year, month }, { location });
  }

  componentDidUpdate(prevProps) {
    const currentLocation = this.props.location;

    const prevLocation = prevProps.location;
    if (lodash.isEqual(prevLocation, currentLocation)) return;

    this.props.updateAfterLocationUpdate({
      prevLocation,
      currentLocation
    });
  }

  handleClickStocksTableColumn = ({ column, direction }) => {
    this.setState({
      stocksTableColumn: column,
      stocksTableDirection: direction
    });
  }

  handleSelectErDate = (erDate) => {
    if (erDateHasData({ erDate, stocksState: this.props[stocksModuleKey] })) {
      this.props.setErDate(erDate);
      return;
    }

    const year = erDate.year();
    const month = erDate.month() + 1;
    this.props.loadStocks({ year, month }, { erDate, location: this.props.location });
  }

  render() {
    const {
      withSameErDate,
      tradingDaysByErDate,
      defaultErDate,
      erDate,

      isFetching,
      errorMessage
    } = this.props[stocksModuleKey];

    if (errorMessage) {
      return (
        <Segment textAlign="center" vertical>
          <Message negative compact>
            <Message.Header>Error</Message.Header>
            <p>{errorMessage}</p>
          </Message>
        </Segment>
      );
    }

    const {
      stocksTableColumn,
      stocksTableDirection
    } = this.state;

    const actualErDate = erDate || defaultErDate;

    const isTradingDayPresent = getIsTradingDayPresent({ actualErDate, tradingDaysByErDate });

    return (
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{pageTitle}</title>
        </Helmet>

        <Divider hidden />

        <Segment>
          <Header as="h4">
            <Image circular src={reactReduxImg} />

            <Header.Content>
              <a
                href="https://github.com/michael-software-engr/demo/tree/master/app/javascript/stocks"
                target="_blank"
                rel="noopener noreferrer"
              >
                {pageTitle}
              </a>
            </Header.Content>
          </Header>
        </Segment>

        <Segment textAlign="left" vertical>
          <Calendar
            handleSelectErDate={this.handleSelectErDate}
            tradingDaysByErDate={tradingDaysByErDate}
            erDate={actualErDate}
          />
        </Segment>

        <Segment textAlign="center" vertical>
          <Dimmer active={isFetching || (!withSameErDate && !isTradingDayPresent)}>
            <Loader />
          </Dimmer>

          <StocksTableLoader
            handleClickStocksTableColumn={this.handleClickStocksTableColumn}
            withSameErDate={withSameErDate}
            stocksTableColumn={stocksTableColumn}
            stocksTableDirection={stocksTableDirection}
            isTradingDayPresent={isTradingDayPresent}
          />
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  stocks: state[stocksModuleKey]
});

export default withRouter(connect(mapStateToProps, {
  loadStocks: unconnectedLoadStocks,
  loadTradingDays: unconnectedLoadTradingDays,
  setErDate: unconnectedSetErDate,
  updateAfterLocationUpdate: unconnectedUpdateAfterLocationUpdate
})(Stocks));
