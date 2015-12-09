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

  #col_null_ratio는  { col1:value, col2:value2, col3:value3}같은 형
  def quantity_score
    all_tuple_num = self.all_tuple_num
    duplicated_tuple_num = self.duplicated_tuple_num
    ratios = self.column_null_ratios.pluck(:null_ratio)
    
    quantity_score_value = 10

    # null 비율로 정량평가
    for ratio in ratios
    puts ratio
      if ratio >= 0.5 && quantity_score_value > 0
        quantity_score_value = quantity_score_value - 1
      end
    end
    # 중복튜플 비율로 정량평가
    if (1.0*duplicated_tuple_num) / (1.0*all_tuple_num) >= 0.3
    if quantity_score_value >= 3
      quantity_score_value = quantity_score_value - 3
    else
      quantity_score_value = 0
    end
    end
    quantity_score_value
  end


  # CSV Parser
  # SCHEMAS (NO TYPES)
  # csv_file_col -> 원본데이터파일 string에서 얻은 attribute array
  # raw_schema_col -> 원본 데이터 schema 
  # tdt_schema_col -> 태스크 데이터 테이블 스키마
  # TUPLES
  # csv_file_tuples -> 원본데이터파일의 tuples
  # raw_schema_tuples -> 원본 데이터 schema에 맞춰 뽑은 tuples
  # tdt_tuples -> 파싱 완료된 tuples
  def self.parsing_file(csv_file_string, raw_data_type_schema, task_data_table_schema, rdt_id)
    #output variables
    col_null_ratios = {}
    parsed_file = ""
    returnHash = {}

    # csv_file_tuples -> raw_schema_tuples ->tdt_tuples
    csv_file_tuples=[]
    raw_schema_tuples=[]
    tdt_tuples=[]

    # input에서 attribute 이름만 뽑은 array
    csv_file_col = []
    raw_schema_col = raw_data_type_schema
    tdt_schema_col = []
    for col in task_data_table_schema
      tdt_schema_col << col[:col_name]

    #save csv_file_attribute
    tupleStr = CSV.parse(csv_file_string)
    """
    for attribute in tupleStr[0]
      csv_file_col << attribute
    end
    """
    csv_file_col = raw_data_type_schema
    
    #Create csv_file_tuples & raw_schema_tuples 
    #raw_schema_tuples는 schema순서를 따르지 않음
    csv_file_tuples = CSV.parse(csv_file_string).map {|a| Hash[ csv_file_col.zip(a)]}
    #csv_file_tuples.shift # Delete attribute tuple
    for tuple in csv_file_tuples
      raw_schema_tuples << tuple.select{|k,v| raw_schema_col.include?(k)}
    end
    
    #Create tdt_tuples except type
    for rdt_tuple in raw_schema_tuples
      temp = {}
      for mapped_col in task_data_table_schema
        target_col_name = ''
        for rdt_cols in mapped_col[:mapping]
          if rdt_cols[:rdt_id] == rdt_id
            target_col_name = rdt_cols[:rdt_col_name]
            break
          end
        end
        logger.info 'target col name'
        logger.info target_col_name
        temp[mapped_col[:col_name]] = rdt_tuple[target_col_name]
        col_null_ratios[mapped_col[:col_name]] = 0.0
      end
      """
      for attribute in tdt_schema_col
        temp[attribute] = tuple[attribute]
        col_null_ratios[attribute] = 0.0
      end
      """
      tdt_tuples << temp
    end
    
    # count duplicated_tuple_num
    duplicated_tuple = tdt_tuples.group_by {|tuple| tuple[tdt_schema_col[1]]}.values.select{|tdt_tuples| tdt_tuples.size>1}.flatten
    
    # Delete duplicated tuples
    tdt_tuples = tdt_tuples.uniq
    
    # null ratio check & tuples to CSV
    parsed_file << tdt_schema_col.join(",") << "\n"
    
    for tuple in tdt_tuples 
      for attribute in tdt_schema_col
        if tuple[attribute] == nil
          col_null_ratios[attribute]+=1
        end
      end
        parsed_file<<tuple.values.join(",")<<"\n"
    end
    
    for attribute in tdt_schema_col
      col_null_ratios[attribute] /= tdt_tuples.length
    end

    logger.info parsed_file
    
    returnHash[:all_tuple_num] = tdt_tuples.length
    returnHash[:duplicated_tuple_num] = duplicated_tuple.length
    returnHash[:col_null_ratios] = col_null_ratios
    returnHash[:parsed_file] = parsed_file
    returnHash
  end # parsing_file
end
