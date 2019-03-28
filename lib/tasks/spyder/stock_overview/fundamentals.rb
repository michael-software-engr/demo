require_relative './lib'

module StockOverview
  module Fundamentals
    include StockOverview::Lib

    def pe_ratio
      fundamentals = symov_stat_boxes[3]
      return if fundamentals.blank?

      values = fundamentals.css '.flex_container_between .datatag'
      return if values.blank?

      ratio = values[3]
      return ratio.present? && ratio.text.to_f
    end
  end
end
