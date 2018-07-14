class CreateCartedDishes < ActiveRecord::Migration[5.1]
  def change
    create_table :carted_dishes do |t|
      t.integer :user_id
      t.integer :dish_id
      t.integer :order_id
      t.integer :quantity
      t.string :status

      t.timestamps
    end
  end
end
