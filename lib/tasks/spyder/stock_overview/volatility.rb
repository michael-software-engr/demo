require_relative './lib'

module StockOverview
  module Volatility
    include StockOverview::Lib

    def volatility_box
      volatility_wrapper = symov_stat_boxes[2]
      return [] if volatility_wrapper.blank?

      volatility_wrapper.css('.datatag').presence || []
    end

    def volatility_today
      volatility = volatility_box[0]
      volatility.present? && volatility.text.to_f
    end

    def volatility_20_day_hv
      volatility = volatility_box[1]
      volatility.present? && volatility.text.to_f
    end

    def volatility_50_day_hv
      volatility = volatility_box[2]
      volatility.present? && volatility.text.to_f
    end

    def volatility_30_day_iv_values
      values = volatility_box[3]
      values.present? ? values.text.split(/\s+/) : []
    end

    def volatility_30_day_iv
      volatility_30_day_iv_values.first.to_f
    end

    def volatility_30_day_iv_change
      volatility_30_day_iv_values.last.to_f
    end

    def iv_pct_rank_values
      values = volatility_box[4]
      values.present? ? values.text.split(/\s+/) : []
    end

    def iv_pct_rank
      pct = iv_pct_rank_values.first
      pct.present? && sanitize_pct_to_f(pct)
    end

    def iv_pct_rank_category
      category = iv_pct_rank_values.last
      category.present? && category
    end
  end
end
