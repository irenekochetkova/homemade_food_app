class UsersController < ApplicationController

  def show
    user = current_user
    render json: user.as_json
  end

  def create
    user = User.new(
      first_name: params[:first_name],
      last_name: params[:last_name],
      email: params[:email],
      image_url: params[:image_url],
      phone_number: params[:phone_number],
      zipcode: params[:zipcode],
      password: params[:password],
      password_confirmation: params[:password_confirmation],
      provider: params[:provider]
      )

    if user.save
      render json: {message: "User created successfully"}, status: :created
    else
      render json: {errors: user.errors.full_messages}, status: :bad_request
  end
 end

 def update
    user = current_user
    user.update(
      first_name: params[:first_name] || user.first_name,
      last_name: params[:last_name] || user.last_name,
      email: params[:email] || user.email,
      image_url: params[:image_url] || user.image_url,
      phone_number: params[:phone_number] || user.phone_number,
      zipcode: params[:zipcode] || user.zipcode,
      password: params[:password] || user.password,
      password_confirmation: params[:password_confirmation] || user.password_confirmation
      )
    render json: user.as_json
  end

  def destroy
    user = current_user
    user.destroy
    render json: {message: "Account successfully delete."}
  end

end
