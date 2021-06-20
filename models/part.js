/* 部件模型表 */
const mongoose = require('./db');
const Schema = mongoose.Schema

const partSchema = new Schema({
  /* 车辆编号 */
  device_id: {
    type: String,
    required: true
  },
  part_name: {
    type: String,
    required: true
  },
  part_type: {
    type: String,
    // 0 主机 1主臂 2副臂 3桅杆 4吊钩 5配重 6拉板（连接件）7其它
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
    type: String
  }
})
module.exports = Part = mongoose.model("part", partSchema);
