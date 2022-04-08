class User < ApplicationRecord
    has_many :tests
    has_secure_password
end
