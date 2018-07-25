Rails.application.routes.draw do

  get "/categories" => "categories#index"
  get "/categories/:id" => "categories#show"
     
  get "/dishes" => "dishes#index"
  get "/dishes/:id" => "dishes#show"
  post "/dishes" => "dishes#create"
  patch "/dishes/:id" => "dishes#update"
  delete "/dishes/:id" => "dishes#destroy"

  post '/user_token' => 'user_token#create'
  get "/current_user" => "users#show"
  post "/users" => "users#create"
  patch "/current_user" => "users#update"
  delete "/current_user" => "users#destroy"

  get "/categories" => "categories#index"
  get "/categories/:id" => "categories#show"

  get "/orders" => "orders#index"
  get "/orders/:id" => "orders#show"
  post "/orders" => "orders#create"
  delete "/orders/:id" => "orders#destroy"

  get "/carted_dishes" => "carted_dishes#index" 
  post "/carted_dishes" => "carted_dishes#create" 
  patch "/carted_dishes/:id" => "carted_dishes#update" 
  delete "/carted_dishes/:id" => "carted_dishes#destroy" 

 
end

