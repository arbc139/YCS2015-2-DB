class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :name
      t.text :description
      t.text :minimum_upload_period
      t.text :task_data_table_schema

      t.timestamps null: false
    end
  end
end
