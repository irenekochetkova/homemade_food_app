class Order < ApplicationRecord
  belongs_to :user

  has_many :carted_dishes
  has_many :dishes, through: :carted_dishes

  def as_json
    {
      id: id,
      user_id: user_id,
      carted_dishes: carted_dishes.as_json,
      subtotal: subtotal,
      total: total,
      tax: tax
    }
  end

end
