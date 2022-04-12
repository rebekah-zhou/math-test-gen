class SectionsController < ApplicationController
    def index
        sections = Section.all
        render json: sections
    end

    def show
        section = Section.find(params[:id])
        if section
          render json: section
        else
          render json: { error: "section not found" }, status: :not_found
        end
    end
end
