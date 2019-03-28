# == Schema Information
#
# Table name: trading_days
#
#  id            :bigint(8)        not null, primary key
#  year          :integer
#  month         :integer
#  day           :integer
#  date          :date
#  dow           :float
#  nasdaq        :float
#  spy           :float
#  dow_change    :float
#  nasdaq_change :float
#  spy_change    :float
#  other         :text
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class TradingDay < ApplicationRecord
  has_many :stocks
end
