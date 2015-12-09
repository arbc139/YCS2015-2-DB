class Task < ActiveRecord::Base
  has_many :pds_files, :class_name => 'ParsingDataSequenceFile', :foreign_key => 'task_id'
    
  has_many :r_task_raw_data
  has_many :raw_data_types, through: :r_task_raw_data
    
  has_many :r_user_submits
  has_many :users, through: :r_user_submits

  serialize :task_data_table_schema, Array

  def no_of_submitted_files
    self.pds_files.size
  end
  
  def no_of_passed_files
    # get from TDT (need to implement Task Data Table)
    self.pds_files.where(is_passed: true).size
  end

  def unaccepted_submitters
    unaccepted_submitters = []
    for submitter in self.users
      unaccepted_submitters << submitter unless submitter.is_accepted?(self)
    end

    unaccepted_submitters
  end

  def accepted_submitters
    accepted_submitters = []
    for submitter in self.users
      accepted_submitters << submitter if submitter.is_accepted?(self)
    end

    accepted_submitters
  end

  def raw_data_types!
    self.raw_data_types.as_json(only: [:id, :raw_name])
  end
  
  # 동적 테이블 생성 튜토리얼 스크립트들
  def create_tdt#(tdt)
    tdt = {
      table_name: self.task_data_table_name,
      cols: self.task_data_table_schema
    }
    ## tdt[:name] 이름을 가진 테이블 동적 생성
    if !ActiveRecord::Base.connection.table_exists?(tdt[:table_name])
      ActiveRecord::Base.connection.create_table tdt[:table_name] do |t|
        # :id is created automatically
        tdt[:cols].each do |col|
          t.column col[:col_name], 'string'
        end
        t.column 'submitter_name', 'string'
        t.column 'submitter_id', 'integer'
        t.column 'rdt_id', 'integer'
        logger.info 'is created?'
      end
    elsif tdt[:table_name] != self.t_name
      logger.info 'TDT already created'
      logger.info ActiveRecord::Base.connection.tables

      logger.info 'automatically, set TDT name to TASK name'
      self.task_data_table_name = self.t_name
      self.create_tdt
    else
      logger.info 'TDT with task name is already created'
      logger.info ActiveRecord::Base.connection.tables
    end
  end

  def get_all_tdt
    query = 'SELECT * FROM ' << self.task_data_table_name #<< '`' << self.task_data_table_name << '`'
    ActiveRecord::Base.connection.exec_query(query)
  end

  def all_tuple_num_tdt
    query = 'SELECT COUNT(*) FROM "' << self.task_data_table_name << '"' #<< '`' << self.task_data_table_name << '`'
    ActiveRecord::Base.connection.exec_query(query)
  end

  def rdt_tuple_num_tdt(rdt_id)
    query = 'SELECT COUNT(*) FROM "' << self.task_data_table_name << '"' << ' WHERE "' << self.task_data_table_name << '"."rdt_id" = ' << rdt_id.to_s #<< '`' << self.task_data_table_name << '`'
    ActiveRecord::Base.connection.exec_query(query)
  end

  def submit_tuple_num_tdt(submitter_id)
    query = 'SELECT COUNT(*) FROM "' << self.task_data_table_name << '"' << ' WHERE "' << self.task_data_table_name << '"."submitter_id" = ' << submitter_id.to_s #<< '`' << self.task_data_table_name << '`'
    ActiveRecord::Base.connection.exec_query(query)
  end

  def drop_tdt
    tdt_name = self.task_data_table_name
    query = 'DROP TABLE ' << tdt_name
    ActiveRecord::Base.connection.exec_query(query)
  end

  #tdt는 table_name과 column name의 array를 가진다
  def save_file_to_tdt(parsed_file, submitter_name, rdt_id, submitter_id)
    tdt = {
      table_name: self.task_data_table_name,
      cols: self.task_data_table_schema
    }
    logger.info ActiveRecord::Base.connection.tables
    tuples = parsed_file.split("\n")
    logger.info 'is ok?'
    logger.info tuples
    tuples.shift
    logger.info tuples

    ActiveRecord::Base.transaction do
      for tuple in tuples
        query_text = "INSERT INTO #{tdt[:table_name]}("
        #query_text = "INSERT INTO `#{tdt[:table_name]}` ("
        for col in tdt[:cols]
          query_text << col[:col_name] << ', '
         #query_text << '`' << col << '`, '
        end
        query_text << "submitter_name, rdt_id, submitter_id\) VALUES \("
        #query_text << "`submitter_name`, `rdt_id`\) VALUES \("
        tuple = tuple.split(",")
        for attribute in tuple
          if attribute.length==0
            attribute = "NULL"
          end
          query_text <<'\'' << attribute << '\', '
        end 
        query_text << '\'' << submitter_name << '\', '
        query_text << rdt_id.to_s << ', '
        query_text << submitter_id.to_s
        query_text << "\)"
        ActiveRecord::Base.connection.exec_query(query_text)
        logger.info 'Iam ok?'
      end
    end
  end

  def update_tdt_schema(rdt_mappings)
    parse = Hash.new
    rdt_mappings.each do |col|
      parse[col[:col_name]] = col[:mapping]
    end

    task_data_table_schema.each do |tdt_col|
      tdt_col[:mapping] << parse[tdt_col[:col_name]]
    end
  end

  def export_CSV
    tdt_name = self.task_data_table_name
    query = 'SELECT * FROM '
    query << tdt_name
    #query << '`' << tdt_name << '`'
    
    tuples = ActiveRecord::Base.connection.exec_query(query).as_json
    resultCSV = ""
    resultCSV << tuples[0].keys.join(",") << "\n"
    for tuple in tuples
      resultCSV<<tuple.values.join(",")<<"\n"
    end 
    resultCSV = resultCSV.chop
    resultCSV
  end
end
