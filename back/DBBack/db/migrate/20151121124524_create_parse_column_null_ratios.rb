class CreateParseColumnNullRatios < ActiveRecord::Migration
  def change
    create_table :parse_column_null_ratios do |t|
      t.references :parsing_file
      t.text :column_name
      t.float :null_ratio

      t.timestamps null: false
    end
  end
end
