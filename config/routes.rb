Rails.application.routes.draw do
  resources :stocks do
    collection { get 'by_year_month' }
  end

  resources :trading_days do
    collection { get 'by_years' }
  end

  devise_for :users

  root 'stocks#index'
end
