class CoursesController < ApplicationController
    def index
        courses = Course.all
        render json: courses
    end

    def show
        course = Course.find_by(id: params[:id])
        if course
          render json: course
        else
          render json: { error: "Course not found" }, status: :not_found
        end
    end
end
