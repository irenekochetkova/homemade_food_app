class ApplicationController < ActionController::API
  include Knock::Authenticable
  def authenticate_provider
    unless current_user.provider
      render json: {message: "You must be a chef"}, status: :unauthorized
    end
  end
end
