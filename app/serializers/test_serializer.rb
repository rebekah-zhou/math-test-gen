class TestSerializer < ActiveModel::Serializer
  attributes :id, :title, :updated_at

  has_many :sections
end
