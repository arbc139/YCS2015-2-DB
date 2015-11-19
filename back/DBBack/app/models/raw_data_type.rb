class RawDataType < ActiveRecord::Base
    has_many :r_user_submits
    has_many :tasks, through: :r_user_submits
end
