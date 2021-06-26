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
    // default: () => moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    default: Date.now
  }
})
// logisticsSchema.path('created_time').get(v => {
//   const t = moment(v).utcOffset(8).format
// })
module.exports = Logistics = mongoose.model('logistics', logisticsSchema)