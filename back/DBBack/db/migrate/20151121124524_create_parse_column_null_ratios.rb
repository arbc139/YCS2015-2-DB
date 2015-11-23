class CreateParseColumnNullRatios < ActiveRecord::Migration
  def change
    create_table :parse_column_null_ratios do |t|
      t.belongs_to :parsing_file, index: true
      t.text :column_name
      t.float :null_ratio

      t.timestamps null: false
    end
  end
end
