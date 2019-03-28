require_relative './lib'

module StockOverview
  module StockInfo
    include StockOverview::Lib

    def stock_info
      stat_box = symov_stat_boxes[4]
      return [] if stat_box.blank?

      stat_box.css('.datatag').presence || []
    end

    def sector
      value = stock_info[1]
      value.present? && value.text
    end

    def sub_category
      value = stock_info[2]
      value.present? && value.text
    end
  end
end
