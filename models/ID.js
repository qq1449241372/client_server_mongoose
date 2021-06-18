// 身份证文档
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
  },
  image_name: String,
  image_url: String,
  image_size: String,
})

module.exports = ID = mongoose.model('ID', IDSchema)