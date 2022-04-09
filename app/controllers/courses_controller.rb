class CoursesController < ApplicationController
    def index
        courses = Course.all
        render json: courses
    end

    def show
        course = Course.find_by(id: session[:user_id])
        if user
          render json: course
        else
          render json: { error: "Not authorized" }, status: :unauthorized
        end
    end
end
