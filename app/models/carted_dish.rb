class CartedDish < ApplicationRecord
  belongs_to :dish
  belongs_to :user
  belongs_to :order, optional: true

  # validates :quantity, inclusion: { in: 1..100, message: 'The quantity must be between 1 and 100' }, presence: true

  validates_numericality_of :quantity, greater_than_or_equal_to: 1, only_integer: true, presence: true

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
