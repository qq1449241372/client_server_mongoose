/* 组合文档 */
const mongoose = require('./db');
const Schema = mongoose.Schema

const combSchema = new Schema({
  device_id: String,
  comb_name: String,
  // 主臂长度
  comb_mainboom_length: Number,
  // 副臂长度
  comb_flyjib_length: Number,
  // 数组中填写臂杆代号
  // 主臂组合
  comb_mainboom: Array,
  // 副臂组合
  comb_flyjib: Array,
})

module.exports = Comb = mongoose.model('comb', combSchema)