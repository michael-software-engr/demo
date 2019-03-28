class StocksController < ApplicationController
  # before_action :set_stock, only: %i[show edit update destroy]

  def by_year_month
    permitted_params = params.permit :year, :month

    @stocks = Stock.includes(:trading_day).where(
      trading_days: { year: permitted_params.fetch(:year), month: permitted_params.fetch(:month) }
    )
  end

  # # GET /stocks
  # # GET /stocks.json
  def index
    redirect_to '/stocks/#stocks?date=2019-03-07'
  end

  # # GET /stocks/1
  # # GET /stocks/1.json
  # def show
  # end

  # # GET /stocks/new
  # def new
  #   @stock = Stock.new
  # end

  # # GET /stocks/1/edit
  # def edit
  # end

  # # POST /stocks
  # # POST /stocks.json
  # def create
  #   @stock = Stock.new(stock_params)

  #   respond_to do |format|
  #     if @stock.save
  #       format.html { redirect_to @stock, notice: 'Stock was successfully created.' }
  #       format.json { render :show, status: :created, location: @stock }
  #     else
  #       format.html { render :new }
  #       format.json { render json: @stock.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # # PATCH/PUT /stocks/1
  # # PATCH/PUT /stocks/1.json
  # def update
  #   respond_to do |format|
  #     if @stock.update(stock_params)
  #       format.html { redirect_to @stock, notice: 'Stock was successfully updated.' }
  #       format.json { render :show, status: :ok, location: @stock }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @stock.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # # DELETE /stocks/1
  # # DELETE /stocks/1.json
  # def destroy
  #   @stock.destroy
  #   respond_to do |format|
  #     format.html { redirect_to stocks_url, notice: 'Stock was successfully destroyed.' }
  #     format.json { head :no_content }
  #   end
  # end

  # private

  # # Use callbacks to share common setup or constraints between actions.
  # def set_stock
  #   @stock = Stock.find(params[:id])
  # end

  # # Never trust parameters from the scary internet, only allow the white list through.
  # def stock_params
  #   params.require(:stock).permit(
  #     :user_id, :trading_day_id, :symbol, :company_name,
  #     :date, :time, :conference_call,
  #     :previous_move, :expected_move,
  #     :options_volume, :market_cap,
  #     :volume, :avg_vol_3m,
  #     :eps_est_next_year, :forward_pe, :price_to_book, :div_payment_date,
  #     :ex_div_date, :div_per_share, :trailing_annual_div_rate, :trailing_annual_div_yield
  #   )
  # end
end
