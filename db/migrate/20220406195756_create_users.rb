class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :username
      t.string :password_digest
      t.string :image
      t.text :bio
      t.belongs_to :course, null: false, foreign_key: true

      t.timestamps
    end
  end
end
