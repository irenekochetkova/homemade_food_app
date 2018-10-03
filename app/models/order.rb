class Order < ApplicationRecord
  belongs_to :user

  has_many :carted_dishes
  has_many :dishes, through: :carted_dishes

  def time
    # time = Time.new
    # time.strftime("%d/%m/%Y")
    created_at.strftime("%d/%m/%Y")
  end

  

  def as_json
    {
      id: id,
      user_id: user_id,
      carted_dishes: carted_dishes.as_json,
      subtotal: subtotal,
      total: total,
      tax: tax,
      time: time,
      current_carted_dishes: carted_dishes.map { |carted_dish| carted_dish.dish }.as_json
      
    }
  end

end


# created_at.strftime('%FT%T')