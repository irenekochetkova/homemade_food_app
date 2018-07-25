Category.create!([
  {title: "American"},
  {title: "Asian"},
  {title: "French"},
  {title: "Indian"},
  {title: "Italian"},
  {title: "Mediterranean"},
  {title: "Mexican"}
])

User.create!([
  {first_name: "David", last_name: "Brown", email: "david@gmail.com", image_url: "#", phone_number: "650-666-66-66", password_digest: "$2a$10$ShjboRv.lE8O4pyfLqByeOyUoB39QZeeARFWKfwVTfhqy9Ys3cWeC", provider: true, zipcode: 94043},
  {first_name: "Lucas", last_name: "Ingram", email: "lucas@gmail.com", image_url: "/photo/lucas.jpg", phone_number: "650-777-77-77", password_digest: "$2a$10$XbZEzjPJKUYYekZtqrEc..K5KzevM.7ru/gXZ.wEhRkcnoonSfh/O", provider: true, zipcode: 94034},
  {first_name: "Sara", last_name: "Petrosov", email: "sara@gmail.com", image_url: "photo/sara.jpg", phone_number: "650-111-11-11", password_digest: "$2a$10$YgJyGn0LYsDiWYBCwp7F..ogQ1iOr3eSvqgupd/wNXuSJOhASXr/u", provider: true, zipcode: 94023},
  {first_name: "James", last_name: "Lopes", email: "james@gmail.com", image_url: "#", phone_number: "650-222-22-22", password_digest: "$2a$10$igFsOAQlifkUYkFC2hrwKeLY3lqjUexHFuzMkRWuE0o6qMAnl7gu2", provider: false, zipcode: 94055}
])



Dish.create!([
  {name: "American pancakes", price: "5.0", image_url: "pictures/pancakes.jpeg", description: "American Pancakes are light and fluffy drenched in caramel syrup with a handful of fresh strawberries", user_id: 1, category_id: 1},
  {name: "Burrito", price: "6.0", image_url: "pictures/burrito.jpg", description: "Burrito with chicken, rice and selery", user_id: 1, category_id: 7},
  {name: "Strawberry pie", price: "16.0", image_url: "pictures/strawberry_pie.jpeg", description: "This homemade Fresh Strawberry Pie is made with a flaky crust, cheesecake filling and is bursting with fresh strawberries. One of our favorite Summer desserts!", user_id: 1, category_id: 1}
])
CartedDish.create!([
  {user_id: 9, dish_id: 1, order_id: nil, quantity: 2, status: "removed"},
  {user_id: 9, dish_id: 1, order_id: nil, quantity: 1, status: "removed"},
  {user_id: 9, dish_id: 2, order_id: 1, quantity: 2, status: "purchased"},
  {user_id: 9, dish_id: 3, order_id: 3, quantity: 3, status: "purchased"},
  {user_id: 9, dish_id: 3, order_id: 4, quantity: 4, status: "purchased"},
  {user_id: 3, dish_id: 3, order_id: 6, quantity: 2, status: "purchased"},
  {user_id: 3, dish_id: 2, order_id: 6, quantity: 3, status: "purchased"},
  {user_id: 9, dish_id: 3, order_id: 13, quantity: 3, status: "purchased"},
  {user_id: 9, dish_id: 1, order_id: 13, quantity: 1, status: "purchased"}
])

Order.create!([
  {user_id: 9, subtotal: "12.0", tax: "1.2", total: "13.2", zipcode: nil},
  {user_id: 9, subtotal: "48.0", tax: "4.8", total: "52.8", zipcode: nil},
  {user_id: 9, subtotal: "64.0", tax: "6.4", total: "70.4", zipcode: nil},
  {user_id: 9, subtotal: "53.0", tax: "5.3", total: "58.3", zipcode: nil}
])

