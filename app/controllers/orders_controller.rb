class OrdersController < ApplicationController

  def index
    orders = current_user.orders
    render json: orders.as_json
  end 

  def create      
    carted_dishes = current_user.carted_dishes.where(status: "carted") 
    subtotal = 0
    carted_dishes.each do |carted_dish|
      subtotal += carted_dish.dish.price * carted_dish.quantity
    end

    tax = subtotal * 0.1
    total = subtotal + tax

    order = Order.new(
      user_id: current_user.id,
      subtotal: subtotal,
      tax: tax,
      total: total
    )

    if order.save
      carted_dishes.update_all(status: "purchased", order_id: order.id)
      render json: order.as_json
    else
      render json: {errors: order.errors.full_messages}, status: 422
    end
  end

  def destroy
    order = Order.find_by(id: params[:id])
    
    order.destroy
    render json: {status: "Carted dish successfully removed!"}
  end
  
end