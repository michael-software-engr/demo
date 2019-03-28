require_relative './er_date'

require_relative './trading_day_populator/spyder'
require_relative './trading_day_populator/trading_day_creator'
require_relative './trading_day_populator/stocks_populator'

require_relative './stock_overview/spyder'
require_relative './stock_overview/updater'

namespace :spyder do # rubocop:disable Metrics/BlockLength
  desc '...'
  task run: :environment do
    er_date = ERDate.new
    trading_day = TradingDayPopulator::TradingDayCreator.run er_date.to_date

    # https://marketchameleon.com/Calendar/Earnings?d=20181120
    uri = URI::HTTPS.build(
      host: 'marketchameleon.com',
      path: '/Calendar/Earnings',
      query: { d: er_date.to_s }.to_query
    )

    spyder = TradingDayPopulator::Spyder.new url: uri.to_s, er_date: er_date.to_s
    stocks_data_noko = spyder.run

    TradingDayPopulator::StocksPopulator.run trading_day, stocks_data_noko
  end

  desc '...'
  task stock_overviews: :environment do
    er_date = ERDate.new
    trading_day = TradingDayPopulator::TradingDayCreator.run er_date.to_date

    # stocks_count = trading_day.stocks.count

    spyder = StockOverview::Spyder.new

    trading_day.stocks.each do |stock|
      symbol = stock.symbol
      puts "... getting stock overview for '#{symbol}'..."

      url = "https://marketchameleon.com/Overview/#{symbol}/"
      # stocks_data_noko = spyder.run url, symbol

      # StockOverview::Updater.new stock, stocks_data_noko

      StockOverview::Updater.new stock, 'stocks_data_noko'

      break

      # if ix != (stocks_count - 1)
      #   wait = rand(2..5)
      #   puts "... waiting '#{wait}' sec between requests..."
      #   sleep wait
      # else
      #   puts
      #   puts '... DONE'
      # end
    end
  end
end
