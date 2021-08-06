const express = require('express')
const router = express.Router()
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const ID = require('../models/ID');
const Avatar = require('../models/avatar');

router.post('/uploads', (req, res) => {
  const form = new formidable.IncomingForm();
  form.encoding = 'utf-8';
  form.uploadDir = path.resolve(__dirname, '..') + '/uploads'
  form.parse(req, (err, fields, files) => {
    if (err) { return res.sendResult(err, 400, '上传失败！') }
    // 判断上传内容并处理
    if (files.ID_image) {
      // console.log('upload ID');
      console.log(files.ID_image.path);
      const newID = new ID({
        image_url: files.ID_image.path,
        image_size: files.ID_image.size / 1024 + 'kb'
      });
      newID.save(newID, (err, result) => {
        if (err) return res.sendResult(err, 400, '保存ID信息失败！')
      })
    }
    if (files.avatar_image) {
      console.log('upload avatar');
      const newAvatar = new Avatar({
        image_url: files.avatar_image.path,
        image_size: files.avatar_image.size / 1024 + 'kb'
      })
      newAvatar.save(newAvatar, (err, result) => {
        if (err) return res.sendResult(err, 400, '保存头像信息失败！')
      })
    }
    res.sendResult({ fields, files }, 200, '图片上传成功!')
  })
})

module.exports = router;