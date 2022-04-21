class UserCoursesController < ApplicationController

    def index
        userCourses = UserCourse.all
        render json: userCourses
    end

    def create
        begin
            UserCourse.transaction do
              @userCourses = UserCourse.create!(userCourses_params)
            end
        rescue ActiveRecord::RecordInvalid => exception
            @userCourses = { error: { status: 422, message: exception} }
        end
        render json: @userCourses
    end

    def show
        userCourse = userCourse.find(params[:id])
        if userCourse
          render json: userCourse
        else
          render json: { error: "Not authorized" }, status: :unauthorized
        end
    end

    private

    def userCourses_params
      params.permit(userCourses: [:user_id, :course_id]).require(:userCourses)
    end
end
