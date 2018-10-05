
// $(document).ready(function() {
//       $(".target1").css("color", "#fff");
//     });
$(document).ready(function() {
      $(".target1").css("color", "#e67e22");
    });
$(document).ready(function() {
      $(".target2").css("color", "#613D07");
    });
// $(document).ready(function() {
//       $(".target3").css("color", "#e67e22");
//     });

$(document).ready(function(){
  $("#reload").click(function(){
 location.reload();
  });
});


 // $("input[type='image']").click(function() {
 //    $("input[id='my_file']").focus().click();
 //  });


var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      email: "",
      password: "",
     
      users: [],
      errors: []
    };
  },
  created: function() {
     axios.get("/users/" ).then(function(response) {// displaying Data from an API
      this.users = response.data;
      console.log(response.data);
    }.bind(this));
     
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          $('#exampleModal').modal('hide'); 
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);

          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)

        );
    }
  },
  computed: {
    list_providers: function() {
      
       return this.users.filter(obj => obj.provider === true);
    }
  }
};

var SignupPage = {
  template: "#signup-page",
  data: function() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      image_url: "",
      phone_number: "",
      zipcode: "",
      provider: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        image_url: this.image_url,
        phone_number: this.phone_number,
        zipcode: this.zipcode,
        provider: this.provider,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/users", params)
        .then(function(response) {
          router.push("/login");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var LoginPage = {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        auth: { email: this.email, password: this.password }
      };
      axios
        .post("/user_token", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
};

var LogoutPage = {
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    router.push("/");
  }
};

var ProfileShowPage = {
  template: "#profile-show-page",
  data: function() {
    return {
      current_user: {},
      first_name: "",
      last_name: "",
      email: "",
      image_url: "",
      phone_number: "",
      zipcode: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  created: function() {
    axios.get("/current_user/" ).then(function(response) {// displaying Data from an API
      console.log(response.data);
      this.current_user = response.data;
      this.first_name = response.data.first_name;
      this.last_name = response.data.last_name;
      this.email = response.data.email;
      this.image_url = response.data.image_url;
      this.phone_number = response.data.phone_number;
      this.zipcode = response.data.zipcode;
    }.bind(this));
  },

  methods: { 
    submit: function() {
        // $(window).on('load');
        location.reload();
      var params = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        image_url: this.image_url,
        phone_number: this.phone_number,
        zipcode: this.zipcode,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
        // $(window).on('load');
        // location.reload();
      axios
      .patch("/current_user", params)
        .then(function(response) {
          // $(window).on('load');
           location.reload();
          router.push("/current_user/");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;           
          }.bind(this));
    },

  }
  
};

var ProfileDeletePage = {
  template: "#profile-delete-page",
  data: function() {
    return {
      current_user: {},
      error: []
    };
  },
  created: function() {
    axios.delete("/current_user").then(function(response) {
      this.current_user = response.data.delete;
      router.push("/current_user");
    })
    .catch(
      function(error) {
        this.error = error.response.data.errors;
        router.push("/");
      }.bind(this));
    
  }
};

var DishesIndexPage = {
  template: "#dish-index-page",
  data: function() {
    return {
      dishes: [],
      currentDish: {},      
      users: [],
      categories: [],
      nameDishFilter: "",
      carted_dishes: [],
      current_user: {},
      quantity: ""
    };
  },
  created: function() {
    axios.get("/dishes").then(function(response) {
      this.dishes = response.data;
      console.log(response.data);
    }.bind(this));
    axios.get("http://localhost:3000/categories").then(function(response) {
      this.categories = response.data; 
      console.log(response.data);
    }.bind(this));
    axios.get("/current_user").then(function(response) {
      console.log(response.data);
       this.current_user = response.data;
    }.bind(this));
    axios.get("/carted_dishes").then(function(response) {
      this.carted_dishes = response.data;      
      console.log(response.data);     
    }.bind(this));
  },

  methods: {
    setCurrentDish: function(dish) {
      this.currentDish = dish;
      console.log(this.currentDish);
    },

    submit: function() {
      var params = {
        quantity: this.quantity,
        dish_id:  this.currentDish.id 
      };
      axios
        .post("/carted_dishes", params)
        .then(function(response) {
          console.log(response.data)
           $('#exampleModalCenter').modal('hide');
           $('body').removeClass('modal-open');
           $('.modal-backdrop').remove();         
          router.push("/dishes");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;            
          }.bind(this));    
    },

    toggle: function() {
      var listCategories = document.getElementById('categories');
      listCategories.classList.toggle('hidden');  
    },

    isValidDish: function(dish) {
      return dish.name.toLowerCase().includes(this.nameDishFilter.toLowerCase());
    },

    categoryFilter: function(category) {
      axios.get("http://localhost:3000/dishes").then(function(response) {
      this.dishes = response.data;
        if (category !== 'all') {
          filtedDishes = [];
          this.dishes.forEach(function(dish) {
            if (dish.category.id === category.id) { 
               filtedDishes.push(dish);
            } 
          });
          this.dishes = filtedDishes;
        }       
        console.log(this.dishes); 
        console.log(response.data);
      }.bind(this));      
    },

    toggleDish: function() {
      var listDishes = document.getElementById('userDishes');
      listDishes.classList.toggle('hidden');  
    },

    dishFilter: function(current_user) {
      axios.get("http://localhost:3000/dishes").then(function(response) {
      this.dishes = response.data;
        if (current_user !== 'all') {
          userDishes = [];
          this.dishes.forEach(function(dish) {
            if (dish.user_id === current_user.id) { 
               userDishes.push(dish);
            } 
          });
          this.dishes = userDishes;
        }       
        console.log(this.dishes); 
        console.log(response.data);
      }.bind(this));    
    }

  },

  computed: {
    count_carted: function() {
      return this.carted_dishes.length;
    }
  }
};

var DishesNewPage = {
  template: "#dishes-new-page",
  data: function() {
    return {
      name: "",
      price: "",
      description: "",
      category_id: "",
      image_url: "",     
      errors: [],
      categories: []
    };
  },
  created: function() {
    axios.get("/categories").then(function(response) {
      this.categories = response.data; 
      console.log(response.data);
    }.bind(this));
  },

  methods: {
    submit: function() {
      var params = {
        name: this.name,
        price: this.price,
        description: this.description,
        category_id: this.category_id,
        image_url: this.image_url       
      };
      axios
        .post("/dishes", params)
        .then(function(response) {
          router.push("/dishes");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this));
    }
  }
};

var DishesEditPage = {
  template: "#dishes-edit-page",
  data: function() {
    return {
      name: "",
      price: "",
      description: "",
      category_id: "",
      image_url: "",
      user_id: "",
      errors: [],
      categories: []

    };
  },
  created: function() {
    $('#exampleModalCenter').modal('hide');
    axios.get("/dishes/" + this.$route.params.id).then(
      function(response) {
           $('#exampleModalCenter').modal('hide');
           $('body').removeClass('modal-open');
           $('.modal-backdrop').remove();
        this.name = response.data.name;
        this.price = response.data.price;
        this.description = response.data.description;
        this.image_url = response.data.image_url;
        this.user_id = response.data.user_id;
      }.bind(this));
    axios.get("/categories/").then(function(response) {
      this.categories = response.data; 
      console.log(response.data);
      }.bind(this));    
  },
  
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        price: this.price,
        description: this.description,
        category_id: this.category_id,
        image_url: this.image_url,
        availability: this.availability
      };
      axios
        .patch("/dishes/" + this.$route.params.id, params)
        .then(function(response) {
          router.push("/dishes");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;           
          }.bind(this));
    }
  },
};

var DishesDeletePage = {
  template: "#dishes-delete-page",
  data: function() {
    return {
      dish: {},
      message: {},
      error: []
    };
  },
  created: function() {
    $('#exampleModalCenter').modal('hide');
    axios.delete("/dishes/" + this.$route.params.id).then(function(response) {
      console.log(response.data);
      this.dish = response.data.delete;
           $('#exampleModalCenter').modal('hide');
           $('body').removeClass('modal-open');
           $('.modal-backdrop').remove();
      router.push("/dishes");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
            router.push("/");
    }.bind(this));
  }
};

var CartedDishesIndexPage = {
  template: "#carted_dish-index-page",
  data: function() {
    return {
      carted_dishes: [],

      dishes: [],
      errors: []
    };
  },

  created: function() {
    axios.get("/carted_dishes").then(function(response) {
      this.carted_dishes = response.data;      
      console.log(response.data);     
    }.bind(this));
    axios.get("/dishes").then(function(response) {
      this.dishes = response.data; 
      console.log(response.data);
    }.bind(this));
    axios.get("/current_user").then(function(response) {
      console.log(response.data);
    }.bind(this));
     

  },

  methods: {
    checkout: function() {
       
       $(window).on('load');

        var params = {
          carted_dishes: this.carted_dishes
        };
        $(window).on('load');
        axios
          .post("/orders", params)
          .then(function(response) {
            router.push("/orders");
            
          })
          .catch(
            function(error) {
              this.errors = error.response.data.errors;
              router.push("/login");
            }.bind(this));
      
    }
 },

    computed: {
      order_subtotal: function() {
        var newArr = [];
        this.carted_dishes.filter(obj => obj.subtotal_carted).map(obj => newArr.push(Number(obj.subtotal_carted)));
        return  newArr.length ? (newArr.reduce((a,b) => (a + b))).toFixed(2) : '0.00';
        // return sum.toFixed(2);
      },

      tax: function() {
        var sum = Number(this.order_subtotal * 0.1);
        return sum.toFixed(2);
      },

      total: function() {
        var sum = Number(this.order_subtotal) + Number(this.tax);
        return sum.toFixed(2);
      }
    }

};


var CartedDishesDeletePage = {
  template: "#cartedDishes-delete-page",
  data: function() {
    return {
      dish: {},
      error: []
    };
  },
  created: function() {
     // $('#exampleModal').modal('hide');
    axios.delete("/carted_dishes/" + this.$route.params.id).then(function(response) {
      console.log(response.data);
      this.carted_dish = response.data.delete;
      router.push("/carted_dishes");
      })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
            router.push("/");
    }.bind(this));
  }
};

var OrdersIndexPage = {
  template: "#orders-index-page",
  data: function() {
    return {
      orders: [],
      carted_dishes: [],
      current_user: {},
      current_carted_dishes: [],
      dishes: []            
    };
  },
  created: function() {
    axios.get("/current_user").then(function(response) {
      console.log(response.data);
       this.current_user = response.data;
    }.bind(this));
    axios.get("/carted_dishes").then(function(response) {
      this.carted_dishes = response.data; 
      $(window).on('load');
      console.log(response.data);
    }.bind(this)),
     axios.get("/dishes").then(function(response) {
      this.dishes = response.data; 
      console.log(response.data);
    }.bind(this)),
    axios.get("/orders/").then(function(response) {
      this.orders = response.data.reverse(); 
      console.log(response.data);
    }.bind(this)); 
    

  },

  methods: {
    isOrder: function(orders) {
      return this.orders.length > 0;
    },
  },

  
};

var OrdersDeletePage = {
    template: "#orders-delete-page",
    data: function() {
      return {
      order: {},
       error: []
      };
    },
      created: function() {  
      axios.delete("/orders/" + this.$route.params.id).then(function(response) {
      console.log(response.data);
      this.order = response.data.delete;
      router.push("/orders");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
            router.push("/");
    }.bind(this));
  }
};


var router = new VueRouter({
  routes: [
  { path: "/", component: HomePage },
  { path: "/signup", component: SignupPage },
  { path: "/login", component: LoginPage },
  { path: "/logout", component: LogoutPage },
  { path: "/current_user", component: ProfileShowPage },
  { path: "/current_user/delete", component: ProfileDeletePage },
  { path: "/dishes", component: DishesIndexPage },
  { path: "/dishes/new", component: DishesNewPage },
  { path: "/dishes/:id/edit", component: DishesEditPage },
  { path: "/dishes/:id/delete", component: DishesDeletePage },
  { path: "/carted_dishes", component: CartedDishesIndexPage },
  { path: "/carted_dishes/:id/delete", component: CartedDishesDeletePage },
  { path: "/orders", component: OrdersIndexPage },
  { path: "/orders/:id/delete", component: OrdersDeletePage }
  ],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router,

  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
     
  }
});


