Rails.application.routes.draw do
  resources :questions, only: [:index, :show, :create, :destroy]
  resources :sections do
    resources :questions, only: [:index, :show]
  end
  resources :users do
    resources :tests 
  end
  resources :sections
  resources :tests, only: [:show, :update, :create, :index, :destroy]
  resources :courses, only: [:show, :index]

  
  post "/login", to: "sessions#create"
  post "/signup", to: 'users#create'
  get "/me", to: "users#show_me"
  delete "/logout", to: "sessions#destroy"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
