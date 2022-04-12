class CreateQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.string :content
      t.string :difficulty
      t.boolean :isMultipleChoice
      t.belongs_to :section, null: false, foreign_key: true
      t.belongs_to :standard, null: false, foreign_key: true

      t.timestamps
    end
  end
end
