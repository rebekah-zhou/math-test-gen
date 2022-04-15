# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_04_15_221306) do

  create_table "answers", force: :cascade do |t|
    t.string "content"
    t.boolean "isCorrect"
    t.integer "question_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["question_id"], name: "index_answers_on_question_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.integer "course_id", null: false
    t.index ["course_id"], name: "index_categories_on_course_id"
  end

  create_table "clusters", force: :cascade do |t|
    t.text "name"
    t.string "notation"
    t.integer "domain_id", null: false
    t.index ["domain_id"], name: "index_clusters_on_domain_id"
  end

  create_table "courses", force: :cascade do |t|
    t.string "name"
  end

  create_table "domains", force: :cascade do |t|
    t.text "name"
    t.integer "category_id", null: false
    t.index ["category_id"], name: "index_domains_on_category_id"
  end

  create_table "questions", force: :cascade do |t|
    t.string "content"
    t.string "difficulty"
    t.boolean "isMultipleChoice"
    t.integer "section_id", null: false
    t.integer "standard_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["section_id"], name: "index_questions_on_section_id"
    t.index ["standard_id"], name: "index_questions_on_standard_id"
  end

  create_table "sections", force: :cascade do |t|
    t.text "instructions"
    t.integer "test_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["test_id"], name: "index_sections_on_test_id"
  end

  create_table "standards", force: :cascade do |t|
    t.text "description"
    t.string "notation"
    t.integer "cluster_id", null: false
    t.index ["cluster_id"], name: "index_standards_on_cluster_id"
  end

  create_table "tests", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.integer "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_tests_on_user_id"
  end

  create_table "user_courses", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "course_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["course_id"], name: "index_user_courses_on_course_id"
    t.index ["user_id"], name: "index_user_courses_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "password_digest"
    t.string "image"
    t.text "bio"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "answers", "questions"
  add_foreign_key "categories", "courses"
  add_foreign_key "clusters", "domains"
  add_foreign_key "domains", "categories"
  add_foreign_key "questions", "sections"
  add_foreign_key "questions", "standards"
  add_foreign_key "sections", "tests"
  add_foreign_key "standards", "clusters"
  add_foreign_key "tests", "users"
  add_foreign_key "user_courses", "courses"
  add_foreign_key "user_courses", "users"
end
