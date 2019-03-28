class RemoveNotesFromStocks < ActiveRecord::Migration[5.2]
  def change
    remove_column :stocks, :notes, :text
  end
end
