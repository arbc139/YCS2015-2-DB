# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151121124524) do

  create_table "parse_column_null_ratios", force: :cascade do |t|
    t.integer  "parsing_file_id"
    t.text     "column_name"
    t.float    "null_ratio"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "parsing_data_sequence_files", force: :cascade do |t|
    t.text     "data_blob"
    t.integer  "period"
    t.integer  "inning"
    t.integer  "all_tuple_num"
    t.integer  "duplicated_tuple_num"
    t.integer  "valuer_id"
    t.boolean  "is_valued"
    t.integer  "data_quality_score"
    t.boolean  "is_passed"
    t.integer  "submitter_id"
    t.integer  "task_id"
    t.integer  "raw_data_type_id"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "r_task_raw_data", force: :cascade do |t|
    t.integer  "task_id"
    t.integer  "raw_data_type_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "r_task_raw_data", ["raw_data_type_id"], name: "index_r_task_raw_data_on_raw_data_type_id"
  add_index "r_task_raw_data", ["task_id"], name: "index_r_task_raw_data_on_task_id"

  create_table "r_user_submits", force: :cascade do |t|
    t.integer  "task_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "r_user_submits", ["task_id"], name: "index_r_user_submits_on_task_id"
  add_index "r_user_submits", ["user_id"], name: "index_r_user_submits_on_user_id"

  create_table "raw_data_types", force: :cascade do |t|
    t.string   "raw_name"
    t.text     "schema"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tasks", force: :cascade do |t|
    t.string   "t_name"
    t.text     "description"
    t.text     "minimum_upload_period"
    t.text     "task_data_table_name"
    t.text     "task_data_table_schema"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "str_id"
    t.string   "password_digest"
    t.string   "u_name"
    t.string   "sex"
    t.string   "address"
    t.date     "birth"
    t.string   "phone_number"
    t.string   "value_score"
    t.string   "role"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

end
