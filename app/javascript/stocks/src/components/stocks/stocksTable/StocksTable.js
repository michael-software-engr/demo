import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Label } from 'semantic-ui-react';

import classNames from 'classnames';
import lodash from 'lodash';

import Content from './Content';
import Filters from './filters/Filters';

import { unconnectedSetSortedStocks } from '../../../redux/modules/stocks/actions/index';
import stocksModule from '../../../redux/modules/stocks/index';

import columnMetaData from './columnMetaData';

import '../../../css/components/stocks/stocksTable/index.css';

const stocksModuleKey = stocksModule.getKey();

const columnMetaDataByColumnName = columnMetaData.reduce((memo, { columnName, ...cmdata }) => ({
  ...memo,
  [columnName]: { ...cmdata, columnName }
}), {});

const tableHeaderClass = 'TableHeader';
const defaultCursorClass = 'DefaultCursor';

class StocksTable extends React.Component {
  state = {
    // column: null,
    // direction: null,
  }

  static propTypes = {
    // Injected by React Redux
    setSortedStocks: PropTypes.func.isRequired,
    [stocksModuleKey]: PropTypes.shape().isRequired, /* eslint-disable-line react/no-unused-prop-types, max-len */

    // Injected by ancestor component.
    handleClickStocksTableColumn: PropTypes.func.isRequired,
    column: PropTypes.string,
    direction: PropTypes.string
  }

  static defaultProps = {
    column: null,
    direction: null
  }

  handleSort = clickedColumn => () => {
    const { column, direction } = this.props;
    // const { column, direction } = this.state;

    const cmdata = columnMetaDataByColumnName[clickedColumn];
    if (!cmdata) {
      throw new Error(`Clicked column '${clickedColumn}' must have a column metadata table entry.`);
    }

    const [semanticUiOrderKey, lodashOrderKey] = cmdata.defaultOrderDirection || [];

    const defaultOrderDirectionSemantic = semanticUiOrderKey || 'descending';
    const defaultOrderDirectionLoDash = lodashOrderKey || 'desc';

    const { currentList, withSameErDate } = this.props[stocksModuleKey];

    if (column !== clickedColumn) {
      this.props.handleClickStocksTableColumn({
        column: clickedColumn,
        direction: defaultOrderDirectionSemantic
        // direction: 'descending'
      });

      // this.setState({
      //   column: clickedColumn,
      //   direction: defaultOrderDirectionSemantic
      //   // direction: 'descending'
      // });

      this.props.setSortedStocks(
        lodash.orderBy(
          currentList || withSameErDate,
          [iter => iter[clickedColumn] || ''],
          [defaultOrderDirectionLoDash]
          // ['desc']
        )
      );

      return;
    }

    this.props.handleClickStocksTableColumn({
      column,
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
    // this.setState({
    //   direction: direction === 'ascending' ? 'descending' : 'ascending',
    // });

    this.props.setSortedStocks((currentList || withSameErDate).reverse());
  }

  render() {
    const { withSameErDate, currentList } = this.props[stocksModuleKey];

    const { column, direction } = this.props;
    // const { column, direction } = this.state;

    return (
      <Table
        sortable
        celled
        fixed
        striped
        className="App--Stocks--StocksTable"

        // color="brown"
        // inverted
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className={tableHeaderClass}>
              <Label tag color="orange">
                {currentList ? currentList.length : withSameErDate.length}
                {' '}
                Total
              </Label>
            </Table.HeaderCell>

            {
              columnMetaData.map(({
                columnName,
                shortTitle,
                unit,
                longTitle,
                width
              }) => (
                <Table.HeaderCell
                  key={columnName}
                  sorted={column === columnName ? direction : null}
                  onClick={this.handleSort(columnName)}
                  textAlign="center"

                  title={['Click to sort "', longTitle || shortTitle, '".'].join('')}
                  width={width}
                  className={tableHeaderClass}
                >
                  {[shortTitle, unit ? `, ${unit}` : ''].join('')}
                </Table.HeaderCell>
              ))
            }
          </Table.Row>

          <Table.Row>
            <Table.HeaderCell className={classNames(tableHeaderClass, defaultCursorClass)} />

            <Filters
              tableHeaderClass={tableHeaderClass}
              defaultCursorClass={defaultCursorClass}
            />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            (currentList || withSameErDate).map((stock, ix) => (
              <Table.Row key={stock.id}>
                <Table.Cell textAlign="center">{ix + 1}</Table.Cell>

                {
                  columnMetaData.map(({
                    columnName,
                    textAlign,
                    formatter,
                    dataTitle,
                    hrefBuilder
                  }) => (
                    <Table.Cell
                      key={columnName}
                      textAlign={textAlign}
                      title={stock[dataTitle]}
                    >
                      <Content
                        formatter={formatter}
                        columnData={stock[columnName]}
                        hrefBuilder={hrefBuilder}
                      />
                    </Table.Cell>
                  ))
                }
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  stocks: state[stocksModuleKey]
});

export default connect(mapStateToProps, {
  setSortedStocks: unconnectedSetSortedStocks
})(StocksTable);
