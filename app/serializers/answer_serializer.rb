class AnswerSerializer < ActiveModel::Serializer
  attributes :id, :content, :isCorrect
end
