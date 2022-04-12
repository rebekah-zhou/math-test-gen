class CategoriesController < ApplicationController
    def index
        categorys = Category.all
        render json: categorys
    end

    def show
        category = Category.find_by(id: params[:id])
        if category
          render json: category
        else
        end
        render json: { error: "Category not found" }, status: :not_found
    end
end
