# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'json'

puts 'seeding! 🌱 🌱 🌱 '

User.create(name: 'Ms. Zhou', username: 'rzhou', password: '0',
    image: 'https://stickershop.line-scdn.net/stickershop/v1/product/8271654/LINEStorePC/main.png;compress=true',
    bio: 'Math teacher with a knack for boba.')

file = File.read('client/public/standards.json')
data_hash = JSON.parse(file)

data_hash['data']['standards'].reverse_each.map do |std, v| 
    case v['statementLabel']
    when "Course"
        Course.create(name: v["description"]) 
    when "Conceptual Category"
        Category.create(name: v['description'], course: Course.last)
    when "Domain"
        Domain.create(name: v['description'], category: Category.last)
    when "Cluster"
        Cluster.create(name: v['description'], domain: Domain.last)
    when "Content Standard"
        Standard.create(description: v['description'], notation: v['statementNotation'], cluster: Cluster.last)
    end
end

puts 'done seeding! 🌱 🌱 🌱'