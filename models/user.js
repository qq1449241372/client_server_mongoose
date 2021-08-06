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
  role: {
    type: String,
    // 0超级管理员 1测试人员 2管理人员 3库管人员 4游客
    enum: [0, 1, 2, 3, 4]
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Users = mongoose.model('users', UsersSchema)