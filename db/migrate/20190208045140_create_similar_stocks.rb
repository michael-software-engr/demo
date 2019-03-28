class CreateSimilarStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :similar_stocks do |t|
      t.belongs_to :stock, foreign_key: true
    end
  end
end
