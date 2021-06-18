// 头像文档
const mongoose = require('./db');
const Schema = mongoose.Schema

const avatarSchema = new Schema({
  avatar_name: {
    type: String
  },
  image_url: String,
  image_size: String
})

module.exports = Avatar = mongoose.model('avatar', avatarSchema)