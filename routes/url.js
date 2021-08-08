const express = require('express');
const router = express.Router()
const Url = require('../models/url');
const _ = require('lodash');
const handleData = require('../utils/url/index');
// 获取url列表
router.get('/url', (req, res, next) => {
  // 验证参数
  if (!req.query.pagenum || req.query.pagenum <= 0) {
    return res.sendResult(null, 400, "pagenum 参数错误");
  }
  if (!req.query.pagesize || req.query.pagesize <= 0) {
    return res.sendResult(null, 400, "pagesize 参数错误")
  }
  next();
},
  (req, res) => {
    Url.find({}, (err, result) => {
      if (err) return res.sendResult(err, 400, '获取url列表失败！')
      res.sendResult(result, 200, '获取url列表成功！')
    })
  }
)
// 添加url数据
router.post('/url', (req, res) => {
  const newUrl = new Url({
    children: handleData(req.body.children),
    icon: req.body.icon,
    id: req.body.id,
    name: req.body.name,
    parentId: req.body.parentId,
    sort: req.body.sort,
    type: req.body.type,
    url: req.body.url
  })
  // 判断url是否重复
  Url.findOne({ url: req.body.url }, (err, result) => {
    if (err) return res.sendResult(null, 400, err._message)
    if (result) return res.sendResult(null, 403, "url已存在，请更换！")
    if (!result) {
      // 添加url
      newUrl.save((err, result) => {
        if (err) return res.sendResult(err, 400, '添加url信息失败！')
        res.sendResult(result, 201, '添加url信息成功！')
      })
    }
  })

})
// 修改url数据
router.put('/url/:id', (req, res) => {
  // 转换children类型 to number
  Url.findByIdAndUpdate(req.params.id, {
    children: handleData(req.body.children),
    icon: req.body.icon,
    id: req.body.id,
    name: req.body.name,
    parentId: req.body.parentId,
    sort: req.body.sort,
    type: req.body.type,
    url: req.body.url
  }, (err, result) => {
    if (err) return res.sendResult(err, 400, '修改url信息失败！')
    // console.log(result);
    res.sendResult(result, 201, `修改${result.name}url成功！`)
  })
})
// 查询url信息
router.get('/url/:id', (req, res) => {
  Url.findById(req.params.id, (err, result) => {
    if (err) return res.sendResult(err, 400, '查询url信息失败！')
    res.sendResult(result, 200, '查询url信息成功！')
  })
})
// 删除url信息
router.delete('/url/:id', (req, res) => {
  Url.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) return res.sendResult(err, 400, '删除url信息失败！')
    res.sendResult(result, 200, '删除url信息成功！')
  })
})
module.exports = router