class ParseColumnNullRatio < ActiveRecord::Base
  belongs_to :parsing_file, :class_name => 'ParsingDataSequenceFile'
end
