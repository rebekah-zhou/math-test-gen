class StandardsController < ApplicationController
    def index
        standards = Standard.all
        render json: standards
    end

    def show
        standard = Standard.find(params[:id])
        if standard
          render json: standard
        else
          render json: { error: "Standard not found" }, status: :not_found
        end
    end
end
