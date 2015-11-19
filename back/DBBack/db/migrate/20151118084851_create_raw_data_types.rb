class CreateRawDataTypes < ActiveRecord::Migration
  def change
    create_table :raw_data_types do |t|
      t.text :schema

      t.timestamps null: false
    end
  end
end
