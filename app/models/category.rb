class Category < ApplicationRecord
  belongs_to :course

  has_many :domains
end
