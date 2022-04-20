class Section < ApplicationRecord
  belongs_to :test

  has_many :questions
end
