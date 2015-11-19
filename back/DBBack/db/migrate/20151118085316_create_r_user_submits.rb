class CreateRUserSubmits < ActiveRecord::Migration
  def change
    create_table :r_user_submits do |t|
      t.belongs_to :task, index: true # FK to task
      t.belongs_to :raw_data_type, index: true  #FK to raw_data_type

      t.timestamps null: false
    end
  end
end
