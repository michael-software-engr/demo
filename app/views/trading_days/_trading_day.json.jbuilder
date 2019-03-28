json.extract! trading_day, :id, :year, :month, :day, :date, :dow, :nasdaq, :spy, :dow_change, :nasdaq_change, :spy_change, :other, :created_at, :updated_at
json.url trading_day_url(trading_day, format: :json)
