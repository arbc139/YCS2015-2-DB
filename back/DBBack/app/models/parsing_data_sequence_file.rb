class ParsingDataSequenceFile < ActiveRecord::Base
  belongs_to :evaluate_user
  belongs_to :submit_user
  belongs_to :task
  belongs_to :raw_data_type

  has_many :parse_column_null_ratios
end
