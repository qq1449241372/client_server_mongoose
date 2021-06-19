// 职工文档
const mongoose = require('./db');
const Schema = mongoose.Schema

const staffSchema = new Schema({
  staff_name: {
    type: String
  },
  staff_phonenumber: {
    type: String,
    match: /^1[3|4|5|7|8][0-9]\d{8}$/
  },
  staff_gender: {
    type: String,
    enum: [0, 1],//0 女 1男
    default: 1
  },
  staff_isParty: Boolean,
  staff_join_party_time: Date,

})

module.exports = Staff = mongoose.model('staff', staffSchema)