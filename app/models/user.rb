class User < ApplicationRecord
    has_many :tests
    has_many :user_courses
    has_many :courses, through: :user_courses
    has_secure_password
    validates :username, presence: true
    validates :username, uniqueness: true
end
