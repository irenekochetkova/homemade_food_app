class CategoriesController < ApplicationController

  def index
    categories = Category.all
    render json: categories.as_json
  end

  def show
    category = Category.find_by(id: params[:id])
    render json: category.as_json
  end

end
