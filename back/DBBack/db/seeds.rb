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
  str_id: 'admin', password: 'admin', name: 'admin', sex: 'M', address: 'Seoul', birth: '09/20', phone_number: '010',
  role: 'admin'
  )

submitter = User.create(
  str_id: 'submitter', password: 's', name: 'dy', sex: 'M', address: 'Seoul', birth: '09/20', phone_number: '010', value_score: '100', 
  role: 'submitter'
  )

valuer = User.create(
  str_id: 'valuer', password: 'v', name: 'dy', sex: 'M', address: 'Seoul', birth: '09/20', phone_number: '010', value_score: '100', 
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


#################################### RAW_DATA_TYPE ####################################
# RAW_DATA_TYPE columns
"""
t.text :schema
"""

# RAW_DATA_TYPE seed
rdt1 = RawDataType.create(schema: "RAW_DATA_TYPE1_schema")
rdt2 = RawDataType.create(schema: "RAW_DATA_TYPE2_schema")
rdt3 = RawDataType.create(schema: "RAW_DATA_TYPE3_schema")
rdt4 = RawDataType.create(schema: "RAW_DATA_TYPE4_schema")


# R_USER_SUBMIT columns
"""
t.belongs_to :task, index: true # FK to task
t.belongs_to :raw_data_type, index: true  #FK to raw_data_type
"""

# relationship PK FK seeds
t1.raw_data_types << [rdt1, rdt2, rdt3]
t2.raw_data_types << [rdt2, rdt3]
t3.raw_data_types << [rdt3, rdt4]
