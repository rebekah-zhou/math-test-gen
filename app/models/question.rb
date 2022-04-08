class Question < ApplicationRecord
  belongs_to :section
  belongs_to :standard

  has_many :answers
end
