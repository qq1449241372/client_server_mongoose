const express = require('express')
const router = express.Router()
const Worker = require('../models/worker');

//获取工人列表 
router.get('/worker', (req, res, next) => {
  // 验证参数
  if (!req.query.pagenum || req.query.pagenum <= 0) {
    return res.sendResult(null, 400, "pagenum 参数错误");
  }
  if (!req.query.pagesize || req.query.pagesize <= 0) {
    return res.sendResult(null, 400, "pagesize 参数错误")
  }
  next();
}, (req, res) => {
  const pgnum = (req.query.pagenum - 1) * req.query.pagesize
  const pgsize = req.query.pagesize * 1
  Worker.find({}, (err, result) => {
    if (err) return res.sendResult(err, 400, '获取工人列表失败')
    res.sendResult(result, 200, '获取工人列表成功')
  }).skip(pgnum).limit(pgsize)
})
//添加工人信息
router.post('/worker', (req, res) => {
  const newWorker = new Worker({
    worker_name: req.body.worker_name,
    worker_phone: req.body.worker_phone,
    worker_gender: req.body.worker_gender,
    device_id: req.body.device_id,
  })
  newWorker.save((err, result) => {
    if (err) return res.sendResult(err, 400, '添加工人信息失败')
    res.sendResult(result, 201, '添加工人信息成功')
  })
})
// 更新工人信息
router.put('/worker/:id', (req, res) => {
  worker = {
    worker_name: req.body.worker_name,
    worker_phone: req.body.worker_phone,
    worker_gender: req.body.worker_gender,
    device_id: req.body.device_id,
  }
  // 更新时验证需要添加参数{ runValidators: true }
  Worker.updateOne({ _id: req.params.id }, worker, { runValidators: true }, (err, result) => {
    if (err) return res.sendResult(err, 400, '更新工人信息失败')
    res.sendResult(result, 201, '更新工人信息成功')
  })
})
//查询工人信息
router.get('/worker/:id', (req, res) => {
  Worker.findById(req.params.id, (err, result) => {
    if (err) return res.sendResult(err, 400, '查询工人信息失败')
    res.sendResult(200, result, '查询工人信息成功')
  })
})
router.delete('/worker/:id', (req, res) => {
  Worker.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) return res.sendResult(err, 400, '删除工人信息失败！')
    res.sendResult(result, 200, '删除工人信息成功！')
  })
})
module.exports = router