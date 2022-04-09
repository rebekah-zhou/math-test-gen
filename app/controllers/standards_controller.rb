class StandardsController < ApplicationController
    def index
        standards = Standard.all
        render json: standards
    end

    def show
        standard = Standard.find_by(id: session[:user_id])
        if user
          render json: standard
        else
          render json: { error: "Not authorized" }, status: :unauthorized
        end
    end
end
