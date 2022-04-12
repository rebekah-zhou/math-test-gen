class QuestionsController < ApplicationController
    def create_onestep_equation
        question = Question.create_onestep_equation
        render json: question, status: :created
    end
end
