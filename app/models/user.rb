class User < ApplicationRecord
  has_many :dishes
  has_many :orders
  has_many :carted_dishes
end
