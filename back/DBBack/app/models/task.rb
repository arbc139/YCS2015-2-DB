class Task < ActiveRecord::Base
    has_many :r_user_submits
    has_many :raw_data_types, through: :r_user_submits
end
