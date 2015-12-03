class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :str_id
      t.string :password_digest
      t.string :u_name
      t.string :sex
      t.string :address
      t.date :birth
      t.string :phone_number
      t.integer :value_score   # only use in submitter
      t.string :role  # 'admin', 'submitter', 'valuer'

      t.timestamps null: false
    end
  end
end
