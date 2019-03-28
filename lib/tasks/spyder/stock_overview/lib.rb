module StockOverview
  module Lib
    def sanitize_to_i(str)
      str.delete(',').to_i
    end

    def sanitize_pct_to_f(str)
      str.delete('%').to_f
    end

    def symov_stat_boxes
      class_name = 'symov_stat_box'.freeze
      page.css(".#{class_name}").presence ||
        raise("Element '.#{class_name}' not found for symbol '#{symbol}'.")
    end
  end
end
