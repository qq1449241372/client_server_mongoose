const express = require('express')
const router = express.Router()
const Role = require('../models/role');

//获取角色列表
router.get('/role', (req, res, next) => {
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
  (req, res) => {
    const pgnum = (req.query.pagenum - 1) * req.query.pagesize
    const pgsize = req.query.pagesize * 1
    Role.find({}, (err, result) => {
      if (err) {
        console.log(err);
        return res.sendResult(err, 400, "获取角色列表失败！")
      }
      res.sendResult(result, 200, "获取角色列表成功!")
    }).skip(pgnum).limit(pgsize)
  }
)
// 添加角色信息
router.post('/role', (req, res) => {
  const newRole = new Role({
    role_name: req.body.role_name,
    role_intro: req.body.role_intro,
    role_type: req.body.role_type,
    role_menus: req.body.role_menus
  })
  // console.log(newRole);
  newRole.save((err, result) => {
    if (err) return res.sendResult(err, 400, "添加角色信息失败！")
    res.sendResult(result, 201, '添加角色信息成功！')
  })
})
// 修改角色信息
router.put('/role/:id', (req, res) => {
  const newRole = new Role({
    role_name: req.body.role_name,
    role_intro: req.body.role_intro,
    role_type: req.body.role_type,
    role_menus: req.body.role_menus
  })
  Role.updateOne({ _id: req.params.id }, newRole, (err, result) => {
    if (err) {
      return res.sendResult(err, 400, '更新角色信息失败！')
    }
    res.sendResult(result, 201, '更新角色信息成功！')
  })
})
module.exports = router