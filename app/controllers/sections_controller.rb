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

    def create 
      begin
        Section.transaction do
          @sections = Section.create!(sections_params)
        end
      rescue ActiveRecord::RecordInvalid => exception
        @sections = { error: { status: 422, message: exception} }
      end
      render json: @sections
    end

    def update
      section = Section.find(params[:id])
      section.update(section_params)
      render json: section
    end

    def destroy
        section = Section.find(params[:id])
        section.delete
        head :no_content
    end

private

    def sections_params
      params.permit(sections: [:instructions, :test_id]).require(:sections)
    end
end
