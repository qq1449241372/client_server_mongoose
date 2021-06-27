// 物流运输文档
const mongoose = require('./db');
const Schema = mongoose.Schema

const logisticsSchema = new Schema({
  device_id: {
    type: String,
    required: true
  },
  main_part: Array,
  main_boom: Array,
  fly_jib: Array,
  weight: Array,
  hook: Array,
  others: Array,
  created_time: {
    type: Date,
    default: Date.now
  },
  destination: String,
  from: String,
  sum_weight: Number,
})

module.exports = Logistics = mongoose.model('logistics', logisticsSchema)