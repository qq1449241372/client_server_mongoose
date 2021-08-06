// 角色模型表
const mongoose = require('./db')
const Schema = mongoose.Schema

const roleSchema = new Schema({
  role_name: {
    type: String
  },
  role_access: {
    type: Array
  }
})

module.exports = Roles = mongoose.model('role', roleSchema)