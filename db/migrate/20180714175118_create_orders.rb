class CreateOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|
      t.integer :user_id
      t.decimal :subtotal
      t.decimal :tax
      t.decimal :total
      t.integer :zipcode

      t.timestamps
    end
  end
end
