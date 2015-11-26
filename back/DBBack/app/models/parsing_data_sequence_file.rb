class ParsingDataSequenceFile < ActiveRecord::Base
  belongs_to :valuer, :class_name => 'User'
  belongs_to :submitter, :class_name => 'User'
  belongs_to :task, :class_name => 'Task'
  belongs_to :raw_data_type, :class_name => 'RawDataType'
  
  has_many :column_null_ratios, :class_name => 'ParseColumnNullRatio', :foreign_key => 'parsing_file_id'
  
  def submitter!
    self.submitter.as_json(only: [:id, :u_name])
  end

  def valuer!
    self.valuer.as_json(only: [:id, :u_name])
  end

  def null_ratios!
    self.column_null_ratios.as_json(only: [:id, :column_name, :null_ratio])
  end

  def valued?
    self.is_valued
  end

  def passed?
    self.is_passed
  end

  def score
    self.data_quality_score
  end
end
