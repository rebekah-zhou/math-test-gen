class TestsController < ApplicationController
    def index
        tests = Test.all
        sorted_tests = tests.sort_by { |test| test.updated_at }
        render json: sorted_tests.reverse, include: ['sections', 'sections.questions']
    end

    def index_user
      user = User.find(params[:user_id])
      tests = user.tests
      sorted_tests = tests.sort_by { |test| test.updated_at }
      render json: sorted_tests.reverse, include: ['sections', 'sections.questions']
    end

    def show
        test = Test.find(params[:id])
        if test
          render json: test, include: ['sections', 'sections.questions', 'sections.questions.answers']
        else
          render json: { error: "test not found" }, status: :not_found
        end
    end

    def create
      test = Test.create(test_params)
      if test.valid?
        render json: test, status: :created
      else
        render json: { errors: test.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      test = Test.find(params[:id])
      test.update(test_params)
      render json: test
    end

    def destroy
        test = Test.find(params[:id])
        test.destroy
        head :no_content
    end

    def show_pdf 
      @test = Test.find(params[:id])

      respond_to do |format| 
        format.html
        format.pdf do
          render pdf:"#{@test.user.name} - #{@test.title}",
          page_size: 'A4',
          template: "tests/show.html.erb"
        end
      end
    end

    def download_pdf
      kit = PDFKit.new('http://google.com')
      file = kit.to_file('./public/test.pdf')
    end

    private
    def test_params
      params.permit(:title, :description, :user_id)
    end
end
