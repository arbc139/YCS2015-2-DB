class RawDataType < ActiveRecord::Base
    has_many :pds_files
    
    has_many :r_task_raw_data
    has_many :tasks, through: :r_task_raw_data

end
