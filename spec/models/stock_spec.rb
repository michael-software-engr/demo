# == Schema Information
#
# Table name: stocks
#
#  id                          :bigint(8)        not null, primary key
#  user_id                     :bigint(8)
#  trading_day_id              :bigint(8)
#  symbol                      :string
#  company_name                :string
#  date_str                    :string
#  bmo_amc                     :string
#  conference_call             :datetime
#  previous_move               :float
#  expected_move               :float
#  options_volume              :integer
#  market_cap                  :bigint(8)
#  volume                      :bigint(8)
#  avg_vol_3m                  :bigint(8)
#  eps_est_next_year           :float
#  forward_pe                  :float
#  price_to_book               :float
#  div_payment_date            :date
#  ex_div_date                 :date
#  div_per_share               :float
#  trailing_annual_div_rate    :float
#  trailing_annual_div_yield   :float
#  created_at                  :datetime         not null
#  updated_at                  :datetime         not null
#  price                       :float
#  fifty_two_week_high         :float
#  fifty_two_week_low          :float
#  volume_90_day_avg           :bigint(8)
#  volume_option_90_day_avg    :bigint(8)
#  volume_option               :bigint(8)
#  volatility_today            :float
#  volatility_20_day_hv        :float
#  volatility_50_day_hv        :float
#  volatility_30_day_iv        :float
#  volatility_30_day_iv_change :float
#  iv_pct_rank                 :float
#  iv_pct_rank_category        :string
#  pe_ratio                    :float
#  sector                      :string
#  industry                    :string
#  sub_category                :string
#  notes                       :jsonb
#

require 'rails_helper'

RSpec.describe Stock, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
