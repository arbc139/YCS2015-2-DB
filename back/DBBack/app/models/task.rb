class Task < ActiveRecord::Base
    has_many :pds_files
    
    has_many :r_task_raw_data
    has_many :raw_data_types, through: :r_task_raw_data
    
    has_many :r_user_submits
    has_many :users, through: :r_user_submits

    def t_name
      self.name
    end
end
