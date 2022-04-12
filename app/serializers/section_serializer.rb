class SectionSerializer < ActiveModel::Serializer
  attributes :id, :instructions 

  has_many :questions
end
