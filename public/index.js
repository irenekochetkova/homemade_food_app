
$(document).ready(function() {
      $(".target1").css("color", "white");
    });

var HomePage = {
  template: "#home-page",
  data: function() {
    return {};
  },
  created: function() {},
  methods: {},
  computed: {}
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
      axios
      .patch("/current_user", params)
        .then(function(response) {
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
      current_user: {},
      quantity: ""
    };
  },
  created: function() {
    axios.get("/dishes").then(function(response) {
      this.dishes = response.data;
      console.log(response.data);
    }.bind(this)),
    axios.get("/categories").then(function(response) {
      this.categories = response.data; 
      console.log(response.data);
    }.bind(this)),
    axios.get("/current_user").then(function(response) {
      console.log(response.data);
    }.bind(this));
  },

  methods: {
    setCurrentDish: function(dish) {
      this.currentDish = dish;
      console.log(this.currentDish);
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
    }
  },
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


