require_relative './lib'

module StockOverview
  module Volumes
    include StockOverview::Lib

    def volumes_box
      volumes_wrapper = symov_stat_boxes[1]
      return [] if volumes_wrapper.blank?

      volumes_wrapper.css('.datatag').presence || []
    end

    def volume_90_day_avg
      volume = volumes_box[1]
      volume.present? && sanitize_to_i(volume.text)
    end

    def volume_option_90_day_avg
      volume = volumes_box[3]
      volume.present? && sanitize_to_i(volume.text)
    end

    def volume_option
      volume = volumes_box[2]
      volume.present? && sanitize_to_i(volume.text)
    end
  end
end
