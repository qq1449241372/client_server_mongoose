/* 子部件模型表 */
const mongoose = require('./db');
const Schema = mongoose.Schema

const subPartSchema = new Schema({
  id: Number,
  //关联部件id
  part_id: Number,
  part_name: {
    type: String,
    required: true
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
})
module.exports = SubPart = mongoose.model("subpart", subPartSchema);
