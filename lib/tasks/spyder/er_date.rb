module TradingDayPopulator

end
class ERDate
  require 'forwardable'
  extend Forwardable

  def_delegators :@date, :year, :month, :day

  def initialize(output_date_separator = '')
    @output_date_separator = output_date_separator
    @date = no_weekends(FromEnv.new.date || default_date)
  end

  def to_date
    date
  end

  def to_s
    date.strftime(%w[Y m d].map { |dcomp| "%#{dcomp}" }.join(output_date_separator))
  end

  private

  attr_reader :date, :output_date_separator

  def now
    Time.zone.now
  end

  def default_date
    return @default_date if @default_date

    plus_x_days = 10
    @default_date = now + plus_x_days.days
  end

  def no_weekends(date_arg)
    Array.new(3) do |ix|
      adjusted = date_arg + ix.days
      return adjusted if !adjusted.on_weekend?
    end

    raise "Unable to find non-weekend date from '#{date_arg}'."
  end

  class FromEnv
    attr_reader :date

    def initialize
      date_env_key = 'date'.freeze
      date_arg = ENV[date_env_key].presence

      return if date_arg.blank?

      @date = date_get date_arg
    end

    private

    def date_get(date_arg)
      input_date_separator = '-'.freeze
      expected_date_input_format = %w[YYYY MM DD].join(input_date_separator).freeze
      format_msg = "must be DD, MM#{input_date_separator}DD" \
        " or #{expected_date_input_format}.".freeze

      esc = Regexp.escape input_date_separator

      if !date_arg.match?(/\A [0-9]+ (?:#{esc}* [0-9]*){0,2} \z/x)
        raise "Invalid date arg '#{date_arg}', #{format_msg}"
      end

      date_components = date_arg.split(input_date_separator)

      now = Time.zone.now
      three_components = (
        if date_components.count == 1
          # Passed only the day part of the date.
          [now.year, now.month, date_arg]
        elsif date_components.count == 2
          # Passed month and date (MM-DD).
          [now.year] + date_components
        elsif date_components.count == 3
          date_components
        else
          raise "Invalid '#{date_env_key}' format, #{format_msg}"
        end
      ).map(&:to_i)

      if !Date.valid_date?(*three_components)
        raise "Arg '#{date_arg}' produces invalid date '#{three_components}', #{format_msg}"
      end

      return Date.new(*three_components)
    end
  end
end
