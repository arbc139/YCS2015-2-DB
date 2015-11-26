class CreateParsingDataSequenceFiles < ActiveRecord::Migration
  def change
    create_table :parsing_data_sequence_files do |t|
      t.text :data_blob
      #t.text :task_name
      t.integer :period
      t.integer :inning
      t.integer :all_tuple_num
      t.integer :duplicated_tuple_num
      
      t.references :evaluate_user
      t.boolean :is_valued
      t.integer :data_quality_score
      t.boolean :is_passed
      
      t.references :submit_user
      t.references :task
      t.references :raw_data_type
      
      t.timestamps null: false
    end
  end
end
