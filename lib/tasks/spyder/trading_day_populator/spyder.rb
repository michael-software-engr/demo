require_relative '../lib'

Kimurai.configure do |config|
  config.chromedriver_path = ::Spyder.chromedriver_path
end

module TradingDayPopulator
  class Spyder < Kimurai::Base
    @name = 'spyder'
    @engine = :selenium_chrome

    @config = {
      # before_request: { delay: 4..7 },
      user_agent: ::Spyder.user_agent
    }

    # https://marketchameleon.com/Calendar/Earnings?d=20181120
    # @start_urls = ['https://marketchameleon.com/Calendar/Earnings']

    def initialize(url:, er_date:)
      super()
      @url = url
      @er_date = er_date
    end

    def run
      request_to :parse, url: url
    end

    def parse(response, url:, data: {}) # rubocop:disable Lint/UnusedMethodArgument
      browser.select 'All', from: 'earn_calendar_tbl_length'
      sleep 4
      response = browser.current_response # rubocop:disable Lint/ShadowedArgument

      expected_total = expected_total_get response
      return [] if expected_total.blank?

      common = 'table#earn_calendar_tbl > tbody >'.freeze
      results = response.css("#{common} tr.odd, #{common} tr.even")

      actual_total = results.count
      if actual_total != expected_total
        # Because pagination. page_end is end of page total, not total total.
        # raise "Actual != expected total, '#{actual_total}' != '#{expected_total}'."
        # warn "WARNING: actual != expected total, '#{actual_total}' != '#{expected_total}'."
      end

      # save_to "/tmp/er-#{er_date}.json", results, format: :pretty_json

      return results
    end

    private

    attr_reader :url, :er_date

    def expected_total_get(response)
      return if no_reports_for_this_date response: response

      result = response.css '#earn_calendar_tbl_info'
      raise if result.blank?

      text = result.text
      raise if text.strip.empty?

      rx_result = ExpectedTotalRegexpResult.get text

      named_captures = rx_result.named_captures
      page_start = named_captures.fetch 'page_start'
      page_end = named_captures.fetch 'page_end'
      return if no_reports_for_this_date page_start: page_start, page_end: page_end

      raise "page_start '#{page_start}' must be 1." if page_start.to_i != 1

      total = named_captures.fetch 'total'
      # Because pagination. page_end is end of page total, not total total.
      # raise "page_end '#{page_end}' must be == '#{total}'." if page_end != total

      return total.to_i
    end

    def no_reports_for_this_date(response: nil, page_start: nil, page_end: nil) # rubocop:disable Metrics/CyclomaticComplexity, Style/LineLength
      if response.present?
        result = response.css(
          "#li_earn_calendar_sel_date_#{er_date} .dateselect_menu_h_table tbody tr:nth-child(2) td"
        )

        return false if result.blank?

        return result.text.to_i.zero?
      end

      if page_start.present? && page_end.present?
        return true if page_start.to_i.zero? && page_end.to_i.zero?
      end

      return false if response.blank?

      raise [
        'Must not reach this point...',
        "Response: '#{response}', page_start: '#{page_start}', page_end: '#{page_end}'"
      ].join("\n")
    end

    class ExpectedTotalRegexpResult
      def self.get(text)
        exp_rx_result = new text
        exp_rx_result.get
      end

      def initialize(text)
        @text = text
      end

      def get
        regexp = Regexp.new(
          # Expected:
          # Estimated | Showing 1 to 4 of 4 Records
          'Estimated \s+ \| \s+ Showing \s+ (?<page_start>\d+) \s+ to \s+ (?<page_end>\d+) \s+ of \s+ (?<total>\d+) \s+ Records', # rubocop:disable Style/LineLength
          Regexp::EXTENDED
        )
        rx_result = text.match regexp

        return rx_result if rx_result.present?

        message = [
          'WARNING: no regexp match for text/regexp...',
          text,
          regexp
        ].join("\n")

        Rails.logger.warn message
        puts message

        # Expected 0 results
        regexp = Regexp.new('Showing (?<page_start>0) to (?<page_end>0) of 0 entries')
        rx_result = text.match regexp
        return rx_result if rx_result.present?

        raise [
          'No regexp match for text/regexp...',
          text,
          regexp
        ].join("\n")
      end

      private

      attr_reader :text
    end
  end
end
