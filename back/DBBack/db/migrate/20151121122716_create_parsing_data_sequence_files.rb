class CreateParsingDataSequenceFiles < ActiveRecord::Migration
  def change
    create_table :parsing_data_sequence_files do |t|
      t.text :data_blob
      t.integer :period
      t.integer :inning
      t.integer :all_tuple_num
      t.integer :duplicated_tuple_num
      
      t.references :valuer
      t.boolean :is_valued, default: false
      t.integer :data_quality_score, default: 0
      t.boolean :is_passed, default: false
      
      t.references :submitter
      t.references :task
      t.references :raw_data_type
      
      t.timestamps null: false
    end
  end
end