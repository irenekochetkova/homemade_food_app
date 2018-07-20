Rails.application.routes.draw do

  post '/user_token' => 'user_token#create'
  
  get "/current_user" => "users#show"

  post "/users" => "users#create"
  patch "/current_user" => "users#update"

  get "/categories" => "categories#index"

  get "/dishes" => "dishes#index"
  post "/dishes" => "dishes#create"


 
end

