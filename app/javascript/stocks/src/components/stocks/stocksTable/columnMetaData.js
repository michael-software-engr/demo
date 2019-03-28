import numeral from 'numeral';

const percentMoveFormatter = data => data && numeral(data).format('0.0');

const columnMetaData = [
  {
    columnName: 'symbol',
    shortTitle: 'Symbol',
    // dataTitle: 'companyName',
    textAlign: 'center',
    defaultOrderDirection: ['ascending', 'asc'],
    hrefBuilder: symbol => `https://finance.yahoo.com/quote/${symbol.toUpperCase()}`,
    // width: 2
  },
  {
    columnName: 'companyName',
    shortTitle: 'Name',
    longTitle: 'Company Name',
    dataTitle: 'companyName',
    textAlign: 'center',
    defaultOrderDirection: ['ascending', 'asc'],
    width: 5
  },
  // {
  //   columnName: 'conferenceCall',
  //   shortTitle: 'ER Date',
  //   formatter: (data) => {
  //     if (!data) return data;
  //     const date = new Date(data);
  //     return date.toString();
  //   }
  // },
  {
    columnName: 'bmoAmc',
    shortTitle: 'BMO/AMC',
    textAlign: 'center',
    longTitle: 'Before Market Open/After Market Close',
    // width: 2
  },
  {
    columnName: 'expectedMove',
    shortTitle: 'Exp. Move',
    unit: '%',
    formatter: percentMoveFormatter,
    textAlign: 'right',
    longTitle: 'Expected Move',
    // width: 2
  },
  {
    columnName: 'previousMove',
    shortTitle: 'Prev. Move',
    unit: '%',
    formatter: percentMoveFormatter,
    textAlign: 'right',
    longTitle: 'Previous Move',
    // width: 2
  },
  // {
  //   columnName: 'optionsVolume',
  //   shortTitle: 'Opt. Volume',
  //   formatter: data => data && data.toLocaleString(),
  //   textAlign: 'right',
  //   longTitle: 'Options Volume'
  // },
  {
    columnName: 'marketCap',
    shortTitle: 'Market Cap',
    unit: '$',
    formatter: data => data && numeral(data).format('0.0 a').toUpperCase(),
    textAlign: 'right',
    // width: 2
  }
  /* eslint-enable no-multi-spaces */
];

export default columnMetaData;
