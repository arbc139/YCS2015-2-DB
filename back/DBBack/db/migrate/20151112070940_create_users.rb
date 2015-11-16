class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :str_id
      t.string :password_digest
      t.string :name
      t.string :sex
      t.string :address
      t.string :birth
      t.string :phone_number
      t.string :value_score
      t.string :role  # 'admin', 'submitter', 'valuer'

      t.timestamps null: false
    end
  end
end
