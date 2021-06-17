/* 用户模型表 */
const mongoose = require('./db');
const Schema = mongoose.Schema

const UsersSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Users = mongoose.model('users', UsersSchema)