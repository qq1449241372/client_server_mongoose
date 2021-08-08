const express = require('express')
const { result } = require('lodash')
const router = express.Router()
const User = require('../models/user')

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
  }
  next();
},
  // 处理业务逻辑
  function (req, res) {
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
// 添加用户
router.post('/user', (req, res) => {
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
      password: req.body.password,
      role: req.body.role,
    })
    newUser.save((err, result) => {
      if (err) return res.sendResult(err, 400, err._message)
      res.sendResult(result, 201, '添加用户成功！')
    })
  })
})
// 修改用户
router.put('/user/:id', (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  })
  User.findByIdAndUpdate({ _id: req.params.id }, newUser, (err, result) => {
    if (err) return res.sendResult(err, 400, '修改用户信息失败！')
    res.sendResult(newUser, 201, '修改用户信息成功！')
  })
})
// 删除用户
router.delete('/user/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, result) => {
    if (!result) return res.sendResult(null, 400, '用户不存在，无法删除!')
    if (err) return res.sendResult(err, 400, '删除用户信息失败！')
    res.sendResult(null, 200, '删除用户信息成功!')
  })
})
module.exports = router