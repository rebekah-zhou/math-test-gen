class TestsController < ApplicationController
    def index
        tests = Test.all
        render json: tests
    end

    def show
        test = Test.find(params[:id])
        if test
          render json: test
        else
          render json: { error: "test not found" }, status: :not_found
        end
    end

    def update
      test = Test.find(params[:id])
      test.update(test_params)
      render json: test
    end

    def destroy
        test = Test.find(params[:id])
        test.delete
        head :no_content
    end

    private
    def test_params
      params.permit(:title, :description, :user_id)
    end
end
