Rails.application.routes.draw do
  root to: 'graphql#execute'
  namespace :api, defaults: {format: :json} do
    post '/graphql', to: 'graphql#execute'
    patch 'likes/mark_seen/', :to => 'likes#mark_seen'
    get 'users/current/', :to => 'users#current'
    post 'users/login/', :to => 'users#login'
    delete 'users/logout/', :to => 'users#logout'
    resources :books, only: [:show, :new]
    resources :users, only: [:show, :create]
    resources :likes, only: [:create, :index]
    resources :poems, only: [:create, :index, :show, :destroy, :update]
  end
  get '*path' => 'graphql#execute'
end
