class Standard < ApplicationRecord
  belongs_to :cluster

  has_many :questions, dependent: :destroy
end
