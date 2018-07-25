class Dish < ApplicationRecord
  belongs_to :user
  belongs_to :category

  has_many :carted_dishes
  has_many :orders, through: :carted_dishes

  validates :name, presence: true, uniqueness: true, length: {minimum: 2}
  validates :price, presence: true
  validates :description, length: {in: 3..500}

  def as_json
    {
      id: id,
      name: name,
      price: price,
      image_url: image_url,
      description: description,
      user: user,
      user_id: user_id,
      category: category

    }
  end

end
