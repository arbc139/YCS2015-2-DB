# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# t.string :user_id
# t.string :password_digest
# t.string :name
# t.string :sex
# t.string :address
# t.string :birth
# t.string :phone_number
# t.string :value_score
# t.string :role  # 'admin', 'submitter', 'valuer'

admin = User.create(
  str_id: 'admin', password: 'admin', name: 'admin', sex: 'M', address: 'Seoul', birth: '09/20', phone_number: '010', role: 'admin'
  )

arbc139 = User.create(
  str_id: 'arbc139', password: '777444', name: 'dy', sex: 'M', address: 'Seoul', birth: '09/20', phone_number: '010', value_score: '100', 
  role: 'valuer'
  )

kem2182 = User.create(
  str_id: 'kem2182', password: '777444', name: 'dy', sex: 'M', address: 'Seoul', birth: '09/20', phone_number: '010', value_score: '100', 
  role: 'submitter'
  )

ip139 = User.create(
  str_id: 'ip139', password: '777444', name: 'dy', sex: 'M', address: 'Seoul', birth: '09/20', phone_number: '010', value_score: '100', 
  role: 'submitter'
  )