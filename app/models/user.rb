class User < ApplicationRecord
  has_many :dishes
  has_many :orders
  has_many :carted_dishes

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
end
