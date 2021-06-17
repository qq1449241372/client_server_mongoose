/* 设备模型表 */
const mongoose = require('./db');
const Schema = mongoose.Schema

const deviceSchema = new Schema({
  device_id: {
    type: String,
    required: true
  },
  device_capacity: {
    type: String,

  },
  creat_time: {
    type: Date,
    default: Date.now,
  },
  device_location: {
    type: String,
  },
})
module.exports = Device = mongoose.model("device", deviceSchema);