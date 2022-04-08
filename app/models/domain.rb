class Domain < ApplicationRecord
  belongs_to :category

  has_many :clusters
end
