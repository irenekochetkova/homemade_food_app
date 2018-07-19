class DishesController < ApplicationController

  def index
    dishes = Dish.all
    render json:dishes.as_json
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
end
