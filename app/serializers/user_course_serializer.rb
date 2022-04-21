class UserCourseSerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :user 
  belongs_to :course
end
