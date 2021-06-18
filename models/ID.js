// 身份证模型表
const mongoose = require('./db');
const Schema = mongoose.Schema

const IDSchema = new Schema({
  ID_name: {
    type: String
  },
  ID_number: {
    type: String,
    default: ''
  },
  ID_address: {
    type: String,
    default: ''
  }
})

module.exports = ID = mongoose.model('ID', IDSchema)