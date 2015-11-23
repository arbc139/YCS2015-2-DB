class RTaskRawDatum < ActiveRecord::Base
    belongs_to :task
    belongs_to :raw_data_type
end
