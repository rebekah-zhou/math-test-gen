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

    def destroy
        test = Test.find(params[:id])
        test.delete
        head :no_content
    end
end
