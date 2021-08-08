// 角色模型表
const mongoose = require('./db')
const Schema = mongoose.Schema

const roleSchema = new Schema({
  role_name: String,
  role_intro: String,
  role_type: {
    type: Number,
    // 0超级管理员 1测试人员 2管理人员 3库管人员 4游客
    enum: [0, 1, 2, 3, 4]
  },
  role_menus: Array
})

module.exports = Roles = mongoose.model('role', roleSchema)