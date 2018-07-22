Rails.application.routes.draw do

  get "/categories" => "categories#index"

  post '/user_token' => 'user_token#create'
  
  get "/current_user" => "users#show"

  post "/users" => "users#create"
  patch "/current_user" => "users#update"
  delete "/current_user" => "users#destroy"

  

  get "/dishes" => "dishes#index"
  post "/dishes" => "dishes#create"
  patch "/dishes/:id" => "dishes#update"


 
end

