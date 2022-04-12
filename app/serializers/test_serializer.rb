class TestSerializer < ActiveModel::Serializer
  attributes :id, :title

  has_many :sections
end
