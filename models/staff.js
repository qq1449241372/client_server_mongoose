// 职工文档
const mongoose = require('./db');
const Schema = mongoose.Schema

const staffSchema = new Schema({
  staff_name: {
    type: String
  },
  staff_phonenumber: {
    type: String,
    default: ''
  },
  staff_gender: {
    type: String,
    enum: [0, 1] //0 女 1男
  }
})