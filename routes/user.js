const express = require('express')
const User = require('../models/user')
const router = express.Router()
/*
$route GET api/login
 @desc 返回的请求json
 @access public
*/
router.get('/login', (req, res) => {
  res.send('login')
})
//查询用户列表
router.get('/user', (req, res, next) => {
  // 验证参数
  if (!req.query.pagenum || req.query.pagenum <= 0) {
    return res.sendResult(null, 400, "pagenum 参数错误");
  }
  if (!req.query.pagesize || req.query.pagesize <= 0) {
    return res.sendResult(null, 400, "pagesize 参数错误")
  } next();
},
  // 处理业务逻辑
  function (req, res, next) {
    const pgnum = (req.query.pagenum - 1) * req.query.pagesize
    const pgsize = req.query.pagesize * 1
    User.find({}, (err, result) => {
      if (err) {
        console.log(err);
        return res.sendResult(err, 400, "获取用户信息失败！")
      }
      res.sendResult(result, 200, "获取用户信息成功！")
    }).skip(pgnum).limit(pgsize)

  }

)
router.post('/user/add', (req, res) => {
  // 查询用户是否存在?
  User.findOne({ username: req.body.username }, (err, result) => {
    if (err) {
      return res.sendResult(null, 400, err._message)
    }
    if (result) {
      // console.log(result);
      return res.sendResult(null, 403, "用户名已存在，请更换！")
    }
    // 执行添加用户
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    })
    newUser.save((err, result) => {
      if (err) {
        //console.log(err);
        return res.sendResult(null, 400, err._message)
      }
      return res.sendResult(result, 201, '添加用户成功！')
    })
  })
})

module.exports = router