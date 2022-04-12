Rails.application.routes.draw do
  resources :questions, only: [:index, :show, :create, :destroy]
  resources :sections do
    resources :questions, only: [:index, :show]
  end
  resources :tests 
  resources :sections

  post "/login", to: "sessions#create"
  post "/signup", to: 'users#create'
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
