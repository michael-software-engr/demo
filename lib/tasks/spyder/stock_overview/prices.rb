require_relative './lib'

module StockOverview
  module Prices
    include StockOverview::Lib

    def price
      overview_last_price = page.css '#overview_last_price'
      return if overview_last_price.blank?

      overview_last_price.text.to_f
    end

    def fifty_two_week
      values_wrapper = symov_stat_boxes[0]
      return [] if values_wrapper.blank?

      values = values_wrapper.css '.flex_container_between .datatag'
      return [] if values.blank?

      values.last.text.split(/\s*\-\s*/).map(&:to_f)
    end

    def fifty_two_week_high
      fifty_two_week.last
    end

    def fifty_two_week_low
      fifty_two_week.first
    end
  end
end
