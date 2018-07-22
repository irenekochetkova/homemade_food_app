class CartedDishesController < ApplicationController

  def index
    carted_dishes = current_user.carted_dishes.where(status: "carted")
    render json: carted_dishes.as_json
  end

  def create
    carted_dish = CartedDish.new(
      user_id: current_user.id,
      dish_id: params[:dish_id],
      quantity: params[:quantity],      
      status: "carted"
      )
    
    if carted_dish.save
      render json: carted_dish.as_json
    else
      render json: {errors: carted_dish.errors.full_messages}, status: 422
    end
  end

  def update
    carted_dish = CartedDish.find_by(id: params[:id])
    carted_dish.update(
      quantity: params[:quantity]
      )
    if carted_dish.save
      render json: carted_dish.as_json
    else
      render json: {errors: carted_dish.errors.full_messages}, status: 422
    end
  end

  def destroy
    carted_dish = CartedDish.find_by(id: params[:id])
    carted_dish.status = "removed"
    carted_dish.save
    render json: {status: "Carted dish successfully removed!"}
  end 

end
