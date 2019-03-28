require 'capybara'

Capybara.register_driver :selenium_chrome do |app|
  # DOC: pass env arg to bin/rspec to use corresponding Chrome option.
  # Example: to run headless...
  # headless=1 bin/rspec
  env_arg_to_chrome_options_mapping = {
    headless: '--headless',
    maximized: '--start-maximized',
    wide: '--window-size=1550,644'
  }

  dual_monitor = ENV['__dual_monitor__'].present? ? ['--window-position=1400,0'] : []

  caps = Selenium::WebDriver::Remote::Capabilities.chrome(
    'chromeOptions' => {
      'args' =>
      env_arg_to_chrome_options_mapping
        .keys
        .select { |env_arg| ENV[env_arg.to_s] }
        .collect { |key| env_arg_to_chrome_options_mapping[key] } + dual_monitor
    }
  )

  Capybara::Selenium::Driver.new(
    app,
    browser: :chrome,
    desired_capabilities: caps
  )
end
Capybara.default_driver = :selenium_chrome

# Capybara.register_driver :selenium_firefox do |app|
#   Capybara::Selenium::Driver.new(app, browser: :firefox)
# end
# Capybara.default_driver = :selenium_firefox

Capybara.default_max_wait_time = 60
Capybara.default_selector = :css
