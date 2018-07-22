class CartedDish < ApplicationRecord
  belongs_to :dish
  belongs_to :user
  belongs_to :order, optional: true

  def subtotal_carted
    dish.price * quantity
  end

  def as_json
    {
      id: id,
      quantity: quantity,
      status: status,
      user: user,
      subtotal_carted: subtotal_carted,
      dish: dish.as_json
    }
  end

end
