class RawDataType < ActiveRecord::Base
    has_many :pds_files, :class_name => 'ParsingDataSequenceFile', :foreign_key => 'raw_data_type_id'
    
    has_many :r_task_raw_data
    has_many :tasks, through: :r_task_raw_data

    serialize :schema, Array
    
end
