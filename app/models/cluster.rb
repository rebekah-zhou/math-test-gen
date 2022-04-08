class Cluster < ApplicationRecord
  belongs_to :domain

  has_many :standards
end
