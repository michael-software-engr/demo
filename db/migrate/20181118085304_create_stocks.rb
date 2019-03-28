class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.belongs_to :user, foreign_key: true
      t.belongs_to :trading_day, foreign_key: true
      t.string :symbol
      t.string :company_name
      t.string :date_str
      t.string :bmo_amc
      t.datetime :conference_call
      t.float :previous_move
      t.float :expected_move
      t.integer :options_volume
      t.bigint :market_cap
      t.bigint :volume
      t.bigint :avg_vol_3m
      t.float :eps_est_next_year
      t.float :forward_pe
      t.float :price_to_book
      t.date :div_payment_date
      t.date :ex_div_date
      t.float :div_per_share
      t.float :trailing_annual_div_rate
      t.float :trailing_annual_div_yield
      t.text :notes

      t.timestamps
    end
  end
end
