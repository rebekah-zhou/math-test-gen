Rails.application.routes.draw do
  resources :questions, only: [:index, :show, :create, :destroy]
  resources :sections do
    resources :questions, only: [:index, :show]
    get '/shufflequestions', to: "sections#shuffle_questions"
    get '/shuffleanswers', to: "sections#shuffle_answers"
  end
  resources :users do
    get '/tests', to: 'tests#index_user'
  end
  resources :sections
  resources :tests, only: [:show, :update, :create, :index, :destroy]
  resources :courses, only: [:show, :index]
  resources :user_courses

  post "/login", to: "sessions#create"
  post "/signup", to: 'users#create'
  get "/me", to: "users#show_me"
  delete "/logout", to: "sessions#destroy"

  get '/pdf', to: 'tests#download_pdf'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
