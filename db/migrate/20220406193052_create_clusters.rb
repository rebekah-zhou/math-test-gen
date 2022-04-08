class CreateClusters < ActiveRecord::Migration[6.1]
  def change
    create_table :clusters do |t|
      t.text :name
      t.string :notation
      t.belongs_to :domain, null: false, foreign_key: true
    end
  end
end
