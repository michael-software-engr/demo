namespace :db do # rubocop:disable Metrics/BlockLength
  desc '...'
  task export: :environment do
    Rails.application.eager_load!

    ActiveRecord::Base.descendants.each do |model|
      next if model == ApplicationRecord
      next if model.count.zero?

      data_file = data_file_by model

      puts "... writing data to '#{data_file}'..."
      File.write(data_file, model.all.to_json)
      # File.write(data_file, model.all.collect { |record| record.as_json.except('id') }.to_json)
    end
  end

  desc '...'
  task import: :environment do
    Rails.application.eager_load!

    if Rails.env.development?
      warn '... must not run in dev env.'
      exit
    end

    ActiveRecord::Base.descendants.each do |model|
      next if model == ApplicationRecord

      data_file = data_file_by model
      next if !File.file? data_file

      model.destroy_all if !Rails.env.development?
    end

    [TradingDay, Stock].each do |model|
      data_file = data_file_by model
      puts "... importing data from '#{data_file}'..."
      json = File.read(data_file)
      data_list = JSON.parse json

      next if Rails.env.development?

      data_list.each do |data|
        record = model.new data
        record.save validate: false
      end
    end
  end

  private

  def data_file_by(model)
    File.join data_dir, [model.to_s.underscore, 'json'].join('.')
  end

  def data_dir
    File.join(File.dirname(__FILE__), 'data')
  end
end
