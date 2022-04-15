class User < ApplicationRecord
    has_many :tests
    has_and_belongs_to_many :courses 
    has_secure_password
    validates :username, presence: true
    validates :username, uniqueness: true
end
