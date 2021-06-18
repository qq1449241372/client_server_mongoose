// 工人模型表
const mongoose = require('./db');
const Schema = mongoose.Schema

const workerSchema = new Schema({
  worker_name: {
    type: String
  },
  worker_birth: {
    type: String
  },
  // 所在设备
  device_id: {
    type: String
  },
  // 是否为机长
  worker_isCaptain: {
    type: Boolean
  }
})
module.exports = Worker = mongoose.model('workers', workerSchema)