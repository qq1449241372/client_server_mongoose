/* url模型表 */
const mongoose = require('./db');
const Schema = mongoose.Schema

const urlSchema = new Schema({
  children: Array,
  icon: String,
  id: Number,
  name: String,
  parentId: Number,
  sort: Number,
  type: Number,
  url: String
})

module.exports = Urls = mongoose.model('url', urlSchema)