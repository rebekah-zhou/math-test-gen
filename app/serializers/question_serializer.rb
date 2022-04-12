class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :content, :difficulty, :isMultipleChoice

  has_one :standard
  has_many :answers
end
