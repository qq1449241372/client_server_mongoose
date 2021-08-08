// 自动加载路由
const express = require('express');
const fs = require('fs');
const router = express.Router()
const files = fs.readdirSync(__dirname)

files
  .filter((file, index) => {
    return file !== 'loader.js'
  })
  .forEach((file, index) => {
    const route = require('./' + file.replace('.js', ''));
    if (file === 'login.js') {
      router.use('/', route)
    } else {
      router.use('/api', route);
      console.log('loader ' + file.replace('.js', '') + ' api success');
    }
  })

module.exports = router

