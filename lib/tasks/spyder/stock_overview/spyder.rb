require 'capybara'

require_relative './capybara_config'

module StockOverview
  class Spyder
    def run(url, _symbol)
      browser = Capybara.current_session
      browser.visit url

      browser.execute_script('setFirstVisitDetails();')

      binding.pry

      result = browser.find '.symov_stat_box'

      pp DEBUG: [result.class]
    end
  end
end

# require_relative '../lib'

# Kimurai.configure do |config|
#   config.chromedriver_path = ::Spyder.chromedriver_path
# end

# module StockOverview
#   class Spyder < Kimurai::Base
#     @name = 'spyder'
#     @engine = :selenium_chrome

#     @config = {
#       # before_request: { delay: 4..7 },
#       user_agent: ::Spyder.user_agent
#     }

#     def run(url, symbol)
#       @symbol = symbol
#       request_to :parse, url: url
#     end

#     def parse(response, url:, data: {}) # rubocop:disable Lint/UnusedMethodArgument
#       initiator = response.find %{a[href="/Overview/#{symbol}/"}, text: 'Summary'
#       initiator.click

#       current_response = browser.current_response

#       really = current_response.css '.symov_stat_box'
#       pp DEBUG: [really, really.count]
#       return current_response

#       # sleep 4
#       # current_response = browser.current_response

#       # really = current_response.css '.symov_stat_box'

#       # pp DEBUG: [really, really.count]

#       # save_to '/tmp/stock.json', current_response, format: :pretty_json

#       # return current_response
#     end

#     private

#     attr_reader :symbol
#   end
# end
