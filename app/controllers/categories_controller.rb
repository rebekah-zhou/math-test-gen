class CategoriesController < ApplicationController
    def index
        categorys = Category.all
        render json: categorys
    end

    def show
        category = Category.find_by(id: session[:user_id])
        if user
          render json: category
        else
          render json: { error: "Not authorized" }, status: :unauthorized
        end
    end
end
