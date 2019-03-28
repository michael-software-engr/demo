module Spyder
  class << self
    def chromedriver_path
      home = ENV.fetch 'HOME'

      "#{home}/.chromedriver-helper/2.41/linux64/chromedriver"
    end

    def user_agent
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8' # rubocop:disable Style/LineLength
    end
  end
end
