class User < ApplicationRecord
  has_secure_password

  has_many :dishes
  has_many :orders
  has_many :carted_dishes

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true
end
