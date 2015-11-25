require 'date'

#################################### USER ####################################
# USER columns
"""
t.string :user_id
t.string :password_digest
t.string :name
t.string :sex
t.string :address
t.string :birth
t.string :phone_number
t.string :value_score
t.string :role  # 'admin', 'submitter', 'valuer'
"""

# USER seeds
admin = User.create(
  str_id: 'admin', password: 'admin', name: 'admin', sex: 'M', address: 'Seoul', birth: Date.parse('1993/09/20'), phone_number: '010',
  role: 'admin'
  )

submitter = User.create(
  str_id: 'submitter', password: 's', name: 'dy', sex: 'M', address: 'Seoul', birth: Date.parse('1997/09/20'), phone_number: '010', value_score: '100', 
  role: 'submitter'
  )

valuer = User.create(
  str_id: 'valuer', password: 'v', name: 'dy', sex: 'M', address: 'Seoul', birth: Date.parse('2001/09/20'), phone_number: '010', value_score: '100', 
  role: 'valuer'
  )

#################################### TASK ####################################
# TASK columns
"""
t.string :name
t.text :description
t.text :minimum_upload_period
t.text :task_data_table_schema
"""

# TASK seeds
t1 = Task.create(name: "TASK1_name", description: "TASK1_descript", minimum_upload_period: "TASK1_period", task_data_table_name: "TASK1_schema_name", task_data_table_schema: "TASK1_schema")
t2 = Task.create(name: "TASK2_name", description: "TASK2_descript", minimum_upload_period: "TASK2_period", task_data_table_name: "TASK2_schema_name", task_data_table_schema: "TASK2_schema")
t3 = Task.create(name: "TASK3_name", description: "TASK3_descript", minimum_upload_period: "TASK3_period", task_data_table_name: "TASK3_schema_name", task_data_table_schema: "TASK3_schema")


#################################### R_USER_SUBMIT(SUBMITTER) ####################################
# R_USER_SUBMIT columns
"""
t.belongs_to :task, index: true # FK to task
t.belongs_to :user, index: true # FK to user
"""

submitter.tasks << t1 << t2 << t3
t1.users << submitter
t2.users << submitter
t3.users << submitter

#################################### RAW_DATA_TYPE ####################################
# RAW_DATA_TYPE columns
"""
t.text :schema
"""

# RAW_DATA_TYPE seed
rdt1 = RawDataType.create(name: "RAW_DATA_TYPE1_name",schema: "RAW_DATA_TYPE1_schema")
rdt2 = RawDataType.create(name: "RAW_DATA_TYPE2_name", schema: "RAW_DATA_TYPE2_schema")
rdt3 = RawDataType.create(name: "RAW_DATA_TYPE3_name", schema: "RAW_DATA_TYPE3_schema")
rdt4 = RawDataType.create(name: "RAW_DATA_TYPE4_name", schema: "RAW_DATA_TYPE4_schema")


# R_TASK_RAW_DATA columns
"""
t.belongs_to :task, index: true # FK to task
t.belongs_to :raw_data_type, index: true  #FK to raw_data_type
"""

# relationship PK FK seeds
t1.raw_data_types << [rdt1, rdt2, rdt3]
t2.raw_data_types << [rdt2, rdt3]
t3.raw_data_types << [rdt3, rdt4]

#################################### PARSING_DATA_SEQUENCE_FILE ####################################
# PARSING_DATA_SEQUENCE_FILE columns
"""
t.binary :data_blob
t.text :task_name
t.integer :period
t.integer :inning
t.integer :all_tuple_num
t.integer :duplicated_tuple_num

t.references :evaluate_user
t.boolean :is_valued
t.integer :data_quality_score
t.boolean :is_passed

t.references :submit_user
t.references :task
t.references :raw_data_type
"""

"""
pdsf1 = ParsingDataSequenceFile.create(
  #data_blob: ---
  #task_name: ---
  period: 10,
  inning: 10,
  all_tuple_num: 10,
  duplicated_tuple_num: 10,
  is_valued: true,
  data_quality_score: 10,
  is_passed: true
  )

pdsf2 = ParsingDataSequenceFile.create(
  #data_blob: ---
  #task_name: ---
  period: 20,
  inning: 20,
  all_tuple_num: 20,
  duplicated_tuple_num: 20,
  is_valued: true,
  data_quality_score: 20,
  is_passed: false
  )


  evaluate_user: valuer.id,
  submit_user: submitter.id,
  task: t1.id,
  raw_data_type: rdt1.id


# PDSF references
pdsf1.evaluate_user = valuer
pdsf1.submit_user = submitter
pdsf1.task = t1
pdsf1.raw_data_type = rdt1

pdsf2.evaluate_user = valuer
pdsf2.submit_user = submitter
pdsf2.task = t1
pdsf2.raw_data_type = rdt2


# relationship PDSF with task
t1.pds_files << [pdsf1, pdsf2]

# relationship PDSF with submitter
submitter.submit_pds_files << [pdsf1, pdsf2]

# relationship PDSF with valuer
valuer.evaluate_pds_files << [pdsf1, pdsf2]

# relationship PDSF with raw_data_type
rdt1.pds_files << [pdsf1]
rdt2.pds_files << [pdsf2]
"""