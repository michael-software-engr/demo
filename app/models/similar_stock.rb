# == Schema Information
#
# Table name: similar_stocks
#
#  id       :bigint(8)        not null, primary key
#  stock_id :bigint(8)
#

class SimilarStock < ApplicationRecord
  belongs_to :stock
  belongs_to :competitor, class_name: 'Stock', foreign_key: :stock_id
end
