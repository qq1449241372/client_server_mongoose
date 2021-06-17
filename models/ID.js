// 身份证模型表
const mongoose = require('./db');
const Schema = mongoose.Schema

const IDSchema = new Schema({
  ID_name: {
    type: String
  },
  ID_number: {
    type: String
  },

})

module.exports = ID = mongoose.model('ID', IDSchema)