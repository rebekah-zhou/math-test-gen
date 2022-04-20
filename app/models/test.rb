class Test < ApplicationRecord
  belongs_to :user

  has_many :sections, dependent: :destroy
  # has_many :questions, through: :sections, dependent: :destroy
  end
