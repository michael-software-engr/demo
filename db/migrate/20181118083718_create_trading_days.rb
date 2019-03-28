class CreateTradingDays < ActiveRecord::Migration[5.2]
  def change
    create_table :trading_days do |t|
      t.integer :year
      t.integer :month
      t.integer :day
      t.date :date
      t.float :dow
      t.float :nasdaq
      t.float :spy
      t.float :dow_change
      t.float :nasdaq_change
      t.float :spy_change
      t.text :other

      t.timestamps
    end
  end
end
