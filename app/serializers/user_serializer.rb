class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :tests
  has_many :courses
end
