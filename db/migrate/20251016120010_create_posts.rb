class CreatePosts < ActiveRecord::Migration[8.0]
  def change
    create_table :posts do |t|
      t.references :user, null: false, foreign_key: true
      t.text :description, null: false
      t.timestamps
    end

    add_index :posts, [ :created_at, :id ]
  end
end
