class DishesController < ApplicationController

  def index
    dishes = Dish.all
    render json: dishes.as_json
  end

  def show
    dish = Dish.find_by(id: params[:id])
    render json: dish.as_json
  end

  def create
    dish = Dish.new(
      name: params[:name],
      price: params[:price],
      image_url: params[:image_url],
      description: params[:description],
      user_id: current_user.id,
      category_id: params[:category_id]
      )

    if dish.save
      render json: dish.as_json
    else
      render json: {errors: dish.errors.full_message}, status: 422
    end
  end

  def update
      dish = Dish.find_by(id: params[:id])
      if dish.user == current_user
        dish.update(
          name: params[:name] || dish.name,
          price: params[:price] || dish.price,
          image_url: params[:image_url] || dish.image_url,
          description: params[:description] || dish.description,  
          category_id: params[:category_id] || dish.category_id
        )
        if dish.save
          render json: dish.as_json     
        else
          render json: {errors: dish.errors.full_messages }, status: 422       
        end 
      else render json: {errors: "This is not your dish"}, status: 422
      end
  end

   def destroy
    
    dish = Dish.find_by(id: params[:id])
    if  dish.user == current_user
    dish.destroy
    render json: {message: "Successfully delete dish."}
    
    else render json: {errors: "This is not your dish"}, status: 422
    end
  end
 
end
