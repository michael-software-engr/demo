class AddColumnsToStock < ActiveRecord::Migration[5.2]
  def change
    add_column :stocks, :price, :float
    add_column :stocks, :fifty_two_week_high, :float
    add_column :stocks, :fifty_two_week_low, :float
    add_column :stocks, :volume_90_day_avg, :bigint
    add_column :stocks, :volume_option_90_day_avg, :bigint
    add_column :stocks, :volume_option, :bigint
    add_column :stocks, :volatility_today, :float
    add_column :stocks, :volatility_20_day_hv, :float
    add_column :stocks, :volatility_50_day_hv, :float
    add_column :stocks, :volatility_30_day_iv, :float
    add_column :stocks, :volatility_30_day_iv_change, :float
    add_column :stocks, :iv_pct_rank, :float
    add_column :stocks, :iv_pct_rank_category, :string
    add_column :stocks, :pe_ratio, :float
    add_column :stocks, :sector, :string
    add_column :stocks, :industry, :string
    add_column :stocks, :sub_category, :string
    add_column :stocks, :notes, :jsonb, default: {}
  end
end
