Rails.application.routes.draw do
  resources :standards
  resources :clusters
  resources :domains
  resources :categories
  resources :courses
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
