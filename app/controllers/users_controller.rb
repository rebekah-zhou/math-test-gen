class UsersController < ApplicationController
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
end
