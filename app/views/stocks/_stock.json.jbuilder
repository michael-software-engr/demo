json.extract!(
  stock,
  :id, :user_id, :trading_day_id, :symbol, :company_name, :date_str, :bmo_amc, :conference_call,
  :previous_move, :expected_move, :options_volume, :market_cap, :volume, :avg_vol_3m,
  :eps_est_next_year, :forward_pe, :price_to_book, :div_payment_date, :ex_div_date, :div_per_share,
  :trailing_annual_div_rate, :trailing_annual_div_yield, :created_at, :updated_at
)

trading_day = stock.trading_day
json.trading_day year: trading_day.year, month: trading_day.month, day: trading_day.day

json.url stock_url(stock, format: :json)
