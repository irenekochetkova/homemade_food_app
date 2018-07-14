class CreateDishes < ActiveRecord::Migration[5.1]
  def change
    create_table :dishes do |t|
      t.string :name
      t.decimal :price
      t.string :image_url
      t.text :description
      t.integer :user_id
      t.integer :category_id

      t.timestamps
    end
  end
end
