# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_02_10_063739) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "similar_stocks", force: :cascade do |t|
    t.bigint "stock_id"
    t.index ["stock_id"], name: "index_similar_stocks_on_stock_id"
  end

  create_table "stocks", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "trading_day_id"
    t.string "symbol"
    t.string "company_name"
    t.string "date_str"
    t.string "bmo_amc"
    t.datetime "conference_call"
    t.float "previous_move"
    t.float "expected_move"
    t.integer "options_volume"
    t.bigint "market_cap"
    t.bigint "volume"
    t.bigint "avg_vol_3m"
    t.float "eps_est_next_year"
    t.float "forward_pe"
    t.float "price_to_book"
    t.date "div_payment_date"
    t.date "ex_div_date"
    t.float "div_per_share"
    t.float "trailing_annual_div_rate"
    t.float "trailing_annual_div_yield"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "price"
    t.float "fifty_two_week_high"
    t.float "fifty_two_week_low"
    t.bigint "volume_90_day_avg"
    t.bigint "volume_option_90_day_avg"
    t.bigint "volume_option"
    t.float "volatility_today"
    t.float "volatility_20_day_hv"
    t.float "volatility_50_day_hv"
    t.float "volatility_30_day_iv"
    t.float "volatility_30_day_iv_change"
    t.float "iv_pct_rank"
    t.string "iv_pct_rank_category"
    t.float "pe_ratio"
    t.string "sector"
    t.string "industry"
    t.string "sub_category"
    t.jsonb "notes", default: {}
    t.index ["trading_day_id"], name: "index_stocks_on_trading_day_id"
    t.index ["user_id"], name: "index_stocks_on_user_id"
  end

  create_table "trading_days", force: :cascade do |t|
    t.integer "year"
    t.integer "month"
    t.integer "day"
    t.date "date"
    t.float "dow"
    t.float "nasdaq"
    t.float "spy"
    t.float "dow_change"
    t.float "nasdaq_change"
    t.float "spy_change"
    t.text "other"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "name"
    t.string "first_name"
    t.string "middle_name"
    t.string "middle_initial"
    t.string "last_name"
    t.string "name_suffix"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

  add_foreign_key "similar_stocks", "stocks"
  add_foreign_key "stocks", "trading_days"
  add_foreign_key "stocks", "users"
end
