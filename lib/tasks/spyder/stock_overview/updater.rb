require_relative './prices'
require_relative './volumes'
require_relative './volatility'
require_relative './fundamentals'
require_relative './stock_info'

module StockOverview
  class Updater
    def initialize(stock, page)
      # @symbol = symbol
      # response = HTTParty.get "https://marketchameleon.com/Overview/#{symbol}/"
      # @page = Nokogiri::HTML(response.body)

      @page = Nokogiri::HTML(File.read('/temp/downloads/er.html'))

      # @page = page
      @symbol = stock.symbol

      attribs_mark_as_incomplete_if_no_data = [
        # Comment to pass RuboCop
        :price,
        :fifty_two_week_high,
        :fifty_two_week_low,
        :volume_90_day_avg,
        :volume_option_90_day_avg,

        :volatility_30_day_iv,
        :volatility_30_day_iv_change,
        :iv_pct_rank,
        :iv_pct_rank_category,

        :pe_ratio
      ].freeze

      other_attribs = [
        # :price,
        # :fifty_two_week_high,
        # :fifty_two_week_low,
        # :volume_90_day_avg,
        # :volume_option_90_day_avg,
        :volume_option,

        # :volatility_30_day_iv,
        # :volatility_30_day_iv_change,
        # :iv_pct_rank,
        # :iv_pct_rank_category,
        :volatility_20_day_hv,
        :volatility_50_day_hv,
        :volatility_today,

        # :pe_ratio,

        :sector,
        :sub_category
      ].freeze

      common_attributes = attribs_mark_as_incomplete_if_no_data & other_attribs
      raise "Common attributes found: #{common_attributes}." if common_attributes.present?

      # stock = Stock.find_by symbol: symbol

      # raise "Stock '#{symbol}' should already be in the database." if stock.blank?

      pp DEBUG: [
        build_update_attributes(
          stock,
          attribs_mark_as_incomplete_if_no_data,
          mark_as_incomplete_if_no_data: true
        ).merge(
          build_update_attributes(stock, other_attribs)
        )
      ]

      # stock.update!(
      #   build_update_attributes(
      #     stock,
      #     attribs_mark_as_incomplete_if_no_data,
      #     mark_as_incomplete_if_no_data: true
      #   ).merge(
      #     build_update_attributes(stock, other_attribs)
      #   )
      # )

      # attribs_to_update = [
      #   :price,
      #   :fifty_two_week_high,
      #   :fifty_two_week_low,
      #   :volume_90_day_avg,
      #   :volume_option_90_day_avg,
      #   :volume_option,

      #   :volatility_30_day_iv,
      #   :volatility_30_day_iv_change,
      #   :iv_pct_rank,
      #   :iv_pct_rank_category,
      #   :volatility_20_day_hv,
      #   :volatility_50_day_hv,
      #   :volatility_today,

      #   :pe_ratio,

      #   :sector,
      #   :sub_category
      # ].freeze
    end

    private

    attr_reader :record, :page, :symbol

    include StockOverview::Prices
    include StockOverview::Volumes
    include StockOverview::Volatility
    include StockOverview::Fundamentals
    include StockOverview::StockInfo

    def build_update_attributes(record, attribs, mark_as_incomplete_if_no_data: false)
      attribs.each_with_object({}) do |attrib_name, obj|
        attrib_value = send attrib_name

        if attrib_value.blank?
          if mark_as_incomplete_if_no_data
            note = { Stock::NOTES.incomplete => true }
            obj[:notes] = record.notes.present? ? record.notes.merge(note) : note
          end
        else
          obj[attrib_name] = attrib_value
        end
      end
    end
  end
end
