class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :content, :difficulty, :isMultipleChoice

  belongs_to :section
  has_one :standard
  has_many :answers
end
