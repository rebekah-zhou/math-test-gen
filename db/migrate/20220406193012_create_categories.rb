class CreateCategories < ActiveRecord::Migration[6.1]
  def change
    create_table :categories do |t|
      t.string :name
      t.belongs_to :course, null: false, foreign_key: true
    end
  end
end
