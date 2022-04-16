class Course < ApplicationRecord
    has_many :categories
    has_many :user_courses
    has_many :users, through: :user_courses

    has_many :domains, through: :categories
    has_many :clusters, through: :domains
    has_many :standards, through: :clusters
end