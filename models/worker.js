// 工人模型表
const mongoose = require('./db');
const Schema = mongoose.Schema

const workerSchema = new Schema({
  worker_name: {
    type: String,
    required: true
  },
  // 操作设备
  device_id: {
    type: String,
  },
  
})

module.exports = Worker = mongoose.model('worker', workerSchema)

