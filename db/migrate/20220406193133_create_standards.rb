class CreateStandards < ActiveRecord::Migration[6.1]
  def change
    create_table :standards do |t|
      t.string :description
      t.string :notation
      t.belongs_to :cluster, null: false, foreign_key: true

      t.timestamps
    end
  end
end
