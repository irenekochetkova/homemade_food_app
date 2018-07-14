class CategoriesController < ApplicationController

  def index
    render json: categories.as_json
  end

end
