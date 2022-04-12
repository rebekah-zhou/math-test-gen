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
                case question.section_id
                when 1
                    equation_data = question.create_onestep_equation
                    question.update(content: equation_data[:equation])
                    onestep_answer_choice_logic(equation_data, question)
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

    def create_answers(ans1, ans2, ans3, ans4, question_id)
        Answer.create(content: "#{ans1}", isCorrect: true, question_id: question_id)
        Answer.create(content: "#{ans2}", isCorrect: false, question_id: question_id)
        Answer.create(content: "#{ans3}", isCorrect: false, question_id: question_id)
        Answer.create(content: "#{ans4}", isCorrect: false, question_id: question_id)
    end

    def onestep_answer_choice_logic(equation_data, question)
        operation, int1, int2, num = equation_data.values_at(:operation, :int1, :int2, :num)
        ans1 = "" 
        ans2 = "" 
        ans3 = "" 
        ans4 = ""
        
        if operation == '+' || operation == '-'
            ans1 = int1
            if operation == '+'
                ans2 = int2 + num
            else
                ans2 = int2 - num
            ans3 = ans1 * -1
            ans4 = ans2 * -1
        elsif operation == '*'
            ans1 = int1
            ans2 = Rational(int2/num)
            ans3 = num - int2
            ans4 = num + int2
        else
            ans1 = num
            ans2 = Rational(int1/int2)
            ans3 = Rational(int2/int1)
            ans4 = int1 + int2
        end
        create_answers(ans1, ans2, ans3, ans4, question.id)
    end
end
