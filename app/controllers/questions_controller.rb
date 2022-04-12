class QuestionsController < ApplicationController
    # def create
    #     question = Question.create(questions_params)
    #     if question.valid? 
    #         render json: question, status: :created
    #     else
    #         render json: { errors: question.errors.full_messages }, status: :unprocessable_entity
    #     end
    # end

    def create 
        Question.transaction do
            @questions = Question.create!(questions_params)
            @questions.each |question| do
                equation_data = question.create_onestep_equation
                question.update(content: equation_data[:equation])
                if equation_data[:operation] == '+' || equation_data[:operation] == '-'
                    ans1 = equation_data[:int2].abs() + equation_data[:num].abs()
                    ans2 = equation_data[:int2].abs() - equation_data[:num].abs()
                    ans3 = ans1 * -1
                    ans4 = ans2 * -1
                    Answer.create(content: ans1)
                end
            end
        end
        render json: @questions
    end

    def index
        questions = Question.all
        render json: questions
    end

    def show
        question = Question.find(params[:id])
        if question
          render json: question
        else
          render json: { error: "Question not found" }, status: :not_found
        end
    end

    private 
    def questions_params
        params.permit(questions: [:difficulty, :type]).require(:questions)
    end
end
