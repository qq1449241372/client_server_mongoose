/* 运输部件模型表 */
const mongoose = require('./db');
const Schema = mongoose.Schema

const partSchema = new Schema({
  /* 关联车辆id */
  device_id: {
    type: Number,
    required: true
  },
  id: Number,
  // 子部件
  children: Array,
  // 父部件
  parent_id: Number,
  part_name: {
    type: String,
    required: true
  },
  part_type: {
    type: Number,
    // 0主机 1主臂 2副臂 3桅杆 4吊钩 5配重 6拉板（连接件）7其它
    enum: [0, 1, 2, 3, 4, 5, 6, 7]
  },
  // 部件代号
  part_codename: {
    type: String,
    default: null
  },
  part_length: {
    type: Number,
    min: 0,
  },
  part_width: {
    type: Number,
    min: 0,
  },
  part_height: {
    type: Number,
    min: 0,
  },
  part_weight: {
    type: Number,
    min: 0,
  },
  part_count: {
    type: Number,
    min: 0,
  },
  part_location: {
    type: String,
    default: '武汉基地'
  },
})
module.exports = Part = mongoose.model("part", partSchema);
