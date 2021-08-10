// 工人信息模型
const mongoose = require('./db');
const Schema = mongoose.Schema

const workerSchema = new Schema({
  worker_name: {
    type: String,
  },
  worker_phone: {
    type: String,
    match: /^1[3|4|5|7|8][0-9]\d{8}$/
  },
  worker_gender: {
    type: String,
    enum: [0, 1],//0 女 1男
    default: 1
  },
  // 操作设备
  device_id: {
    type: String,
  },

})

module.exports = Worker = mongoose.model('worker', workerSchema)

