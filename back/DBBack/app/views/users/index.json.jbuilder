# t.string :user_id
# t.string :password_digest
# t.string :name
# t.string :sex
# t.string :address
# t.string :birth
# t.string :phone_number
# t.string :value_score
# t.string :role  # 'admin', 'submitter', 'valuer'

json.users @users do |user|
  json.str_id user.str_id
  json.password user.password_digest
  json.name user.name

  json.sex user.sex
  json.address user.address
  json.birth user.birth
  json.phone_number user.phone_number
  json.value_score user.value_score
  json.role user.role
end
