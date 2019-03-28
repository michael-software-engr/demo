module TradingDayPopulator
  class StocksPopulator
    class << self
      def run(trading_day, stocks_data_noko)
        stocks_populator = new trading_day, stocks_data_noko
        stocks_populator.run
      end
    end

    def initialize(trading_day, stocks_data_noko)
      @trading_day = trading_day
      @stocks_data = stocks_data_noko
    end

    def run
      stocks = stocks_data.map do |tr|
        tds = tr.css '> td'

        conference_call = conference_call_get tds.at(4)
        notes = nil
        if conference_call && conference_call.day != trading_day.day
          notes = 'conference_call.day != trading_day.day,' \
            " #{conference_call.day} != #{trading_day.day}"
        end

        {
          trading_day: trading_day,
          symbol: symbol_get(tds.at(0)),
          company_name: tds.at(1).text,

          date_str: tds.at(2).text,
          bmo_amc: tds.at(3).text,
          conference_call: conference_call && conference_call.strftime('%Y/%m/%d %I:%M %p'),

          previous_move: previous_move_get(tds.at(5)),
          expected_move: percent_string_to_float(tds.at(6).text),
          options_volume: comma_separated_to_i(tds.at(7).text),

          market_cap: num_with_suffix_to_i(tds.at(8).text),

          notes: notes
        }
      end

      ActiveRecord::Base.transaction do
        trading_day.stocks.destroy_all

        Stock.create! stocks
      end
    end

    private

    attr_reader :trading_day, :stocks_data

    def symbol_get(node)
      sym = node.css('a').try :text
      raise if sym.blank?

      return sym
    end

    def conference_call_get(node)
      text = node.text
      return if text.blank?

      components = text.split(/\s*,\s*/)
      date_comps = components.first.split(/\s+/)
      time_comp = components.last

      month = date_comps.first
      month_int = Date::ABBR_MONTHNAMES.index month

      if month_int.blank?
        Rails.logger.debug(
          DEBUG: [
            'month_int is blank: month, date_comps, components, text...',
            [month, date_comps, components, text]
          ]
        )
        return
      end

      if month_int != trading_day.month
        Rails.logger.debug(
          DEBUG: [
            [
              "month_int != trading_day.month, #{month_int} != #{trading_day.month}",
              'Some rows have ER months different from current month selected.'
            ].join('. '), [month_int, month, date_comps, components, text]
          ]
        )
        return
      end

      day = date_comps.last
      return Time.zone.parse [[trading_day.year, month_int, day].join('/'), time_comp].join(' ')
    end

    def percent_string_to_float(text)
      return if text.blank?

      return text.sub(/\s*%\s*/, '').to_f
    end

    def previous_move_get(node)
      text = node.css('div.hoverdisplay_trigger > span').try :text
      return if text.blank?

      return percent_string_to_float(text)
    end

    def comma_separated_to_i(text)
      return if text.blank?

      return text.delete(',').to_i
    end

    def num_with_suffix_to_i(text)
      return if text.blank?

      suffix_table = { b: 1_000_000_000, m: 1_000_000, k: 1_000 }

      components = text.split(/\s+/)
      value = components[0].delete(',').to_f
      suffix = components[1]

      return value.to_i if suffix.blank?

      multiplier = suffix_table[suffix.downcase.to_sym]

      raise "Invalid num suffix '#{suffix}' for '#{text}'." if multiplier.blank?

      return value.to_f * multiplier
    end
  end
end
