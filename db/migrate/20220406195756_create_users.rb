class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :passwordDigest
      t.string :image
      t.string :bio

      t.timestamps
    end
  end
end
