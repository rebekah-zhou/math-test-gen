class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_res
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_res  
  def index
        users = User.all
        render json: users
  end
  
  def create
    user = User.create(user_params)
    if user.valid?
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: user
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end
  
  private

  def user_params
    params.permit(:username, :password, :password_confirmation, :image, :bio, :course)
  end

  def render_not_found_res
    render json: { error: "User not found" }, status: :not_found
  end

  def render_invalid_res(invalid)
      render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end
end
