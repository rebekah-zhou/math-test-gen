class Test < ApplicationRecord
  belongs_to :user

  has_many :sections
  has_many :questions, through: :sections
  
  # has_many :standards through: :questions
end
