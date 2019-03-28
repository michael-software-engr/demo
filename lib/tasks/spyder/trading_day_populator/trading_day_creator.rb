module TradingDayPopulator
  class TradingDayCreator
    class << self
      def run(date)
        trading_day = new(date).run
        return trading_day
      end
    end

    def initialize(date)
      @date = date
    end

    def run
      TradingDay.where(
        date: date, year: date.year, month: date.month, day: date.day
      ).first_or_create
    end

    private

    attr_reader :date
  end
end
