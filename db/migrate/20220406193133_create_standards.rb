class CreateStandards < ActiveRecord::Migration[6.1]
  def change
    create_table :standards do |t|
      t.text :description
      t.string :notation
      t.belongs_to :cluster, null: false, foreign_key: true
    end
  end
end
