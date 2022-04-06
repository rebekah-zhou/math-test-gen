class CreateDomains < ActiveRecord::Migration[6.1]
  def change
    create_table :domains do |t|
      t.text :name
      t.belongs_to :category, null: false, foreign_key: true
    end
  end
end
