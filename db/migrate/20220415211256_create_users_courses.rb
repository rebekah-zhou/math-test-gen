class CreateUsersCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :users_courses, id: false do |t|
      t.belongs_to :user
      t.belongs_to :course
    end
  end
end
